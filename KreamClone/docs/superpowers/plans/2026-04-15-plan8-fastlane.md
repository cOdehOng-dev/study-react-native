# KREAM Clone — Plan 8: Fastlane + Slack 알림 설정

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fastlane을 설정하여 Jest 테스트를 실행하고 결과를 Slack으로 알림 전송하는 CI 자동화 레인을 구축한다.

**Architecture:** 루트 Gemfile에 fastlane 추가 → `fastlane/Fastfile`에 `test_and_notify` 레인 작성 → `SLACK_WEBHOOK_URL` ENV 변수로 Slack 연동. 웹훅 미설정 시 Slack 알림 스킵.

**Tech Stack:** Fastlane 2.210.1 · Ruby (rbenv 3.3.8) · Jest · Slack Incoming Webhooks

> **시리즈:** Plan 8/8. Plan 7(Shop Feature) 완료 상태에서 시작. 현재 68 tests, 14 suites all passing.

---

## 파일 맵

```
(root)/
├── Gemfile                          (modify: add gem 'fastlane')
└── fastlane/
    ├── Fastfile                     (new)
    ├── Appfile                      (new)
    ├── .env                         (new — gitignored, Slack webhook 실제값)
    └── .env.example                 (new — 템플릿, git에 포함)
```

---

## Task 1: Gemfile에 fastlane 추가 + bundle install

**Files:**
- Modify: `Gemfile`

- [ ] **Step 1: Gemfile에 fastlane gem 추가**

`Gemfile` 하단에 추가:
```ruby
gem 'fastlane'
```

최종 Gemfile:
```ruby
source 'https://rubygems.org'

ruby ">= 2.6.10"

gem 'cocoapods', '>= 1.13', '!= 1.15.0', '!= 1.15.1'
gem 'activesupport', '>= 6.1.7.5', '!= 7.1.0'
gem 'xcodeproj', '< 1.26.0'
gem 'concurrent-ruby', '< 1.3.4'
gem 'bigdecimal'
gem 'logger'
gem 'benchmark'
gem 'mutex_m'
gem 'fastlane'
```

- [ ] **Step 2: bundle install 실행 (fastlane만)**

cocoapods 없이 fastlane만 설치한다:

```bash
bundle config set --local without ''
BUNDLE_PATH="/Users/ghdtjrdn0323/.bundle/gems" bundle install --jobs 4 2>&1 | tail -10
```

cocoapods 설치 실패 시 무시하고 fastlane이 설치되었는지만 확인:
```bash
BUNDLE_PATH="/Users/ghdtjrdn0323/.bundle/gems" bundle exec fastlane --version 2>&1 | head -3
```

- [ ] **Step 3: Commit**

```bash
git add Gemfile Gemfile.lock
git commit -m "chore: add fastlane gem to Gemfile"
```

---

## Task 2: Fastfile + Appfile + .env 파일 생성

**Files:**
- Create: `fastlane/Fastfile`
- Create: `fastlane/Appfile`
- Create: `fastlane/.env.example`
- Create: `fastlane/.env`

- [ ] **Step 1: fastlane/ 디렉토리 생성 및 Appfile 작성**

`fastlane/Appfile`:
```ruby
# KREAM Clone — React Native
# app_identifier, apple_id 등 iOS/Android 배포 설정은 추후 추가
```

- [ ] **Step 2: Fastfile 작성**

`fastlane/Fastfile`:
```ruby
# frozen_string_literal: true

default_platform(:ios)

platform :ios do
  desc "Jest 테스트 실행 후 Slack 알림 전송"
  lane :test_and_notify do
    # 1) Jest 실행
    test_output = ""
    test_success = true

    begin
      test_output = sh(
        "cd .. && npx jest --passWithNoTests --no-coverage 2>&1",
        log: false
      )
    rescue => e
      test_success = false
      test_output = e.message
    end

    # 2) 결과 파싱
    suite_match  = test_output.match(/Test Suites:\s*(.+)/)
    test_match   = test_output.match(/Tests:\s*(.+)/)
    suite_line   = suite_match ? suite_match[1].strip : "알 수 없음"
    test_line    = test_match  ? test_match[1].strip  : "알 수 없음"

    summary = test_success \
      ? "✅ 테스트 통과\nSuites: #{suite_line}\nTests:  #{test_line}" \
      : "❌ 테스트 실패\n#{test_output.lines.last(5).join}"

    UI.message summary

    # 3) Slack 알림 (SLACK_WEBHOOK_URL 설정된 경우에만)
    webhook_url = ENV["SLACK_WEBHOOK_URL"]
    if webhook_url && !webhook_url.empty?
      slack(
        message: summary,
        slack_url: webhook_url,
        success: test_success,
        payload: {
          "Test Suites" => suite_line,
          "Tests"       => test_line,
        },
        default_payloads: [:git_branch, :git_author]
      )
    else
      UI.important "SLACK_WEBHOOK_URL 미설정 — Slack 알림 스킵"
    end
  end
end
```

- [ ] **Step 3: .env.example 작성**

`fastlane/.env.example`:
```
# Slack Incoming Webhook URL
# Slack 앱 설정 > Incoming Webhooks에서 발급
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXXXXX/XXXXXX/XXXXXX
```

- [ ] **Step 4: .env 작성 (gitignored)**

`fastlane/.env`:
```
SLACK_WEBHOOK_URL=
```

Slack 웹훅 URL이 있는 경우 여기에 입력한다. 비어 있으면 알림 스킵.

- [ ] **Step 5: Commit**

```bash
git add fastlane/Fastfile fastlane/Appfile fastlane/.env.example
git commit -m "feat: add Fastfile with test_and_notify lane and Slack integration"
```

`.env`는 gitignore되어 있으므로 add 하지 않는다.

---

## Task 3: 실행 검증

- [ ] **Step 1: fastlane test_and_notify 실행**

```bash
cd /Users/ghdtjrdn0323/Desktop/react-native/KreamClone
BUNDLE_PATH="/Users/ghdtjrdn0323/.bundle/gems" bundle exec fastlane ios test_and_notify 2>&1 | tail -30
```

Expected:
- Jest 68 tests 통과
- "SLACK_WEBHOOK_URL 미설정 — Slack 알림 스킵" 메시지 (`.env`가 비어 있는 경우)

- [ ] **Step 2: 전체 Jest 테스트 재확인**

```bash
npx jest --passWithNoTests --no-coverage 2>&1 | tail -5
```

Expected: 68 tests, 14 suites

- [ ] **Step 3: 최종 Commit**

```bash
git add -p  # 변경사항 없으면 스킵
```

변경사항 없으면:
```bash
git log --oneline -3
```

---

## 최종 확인

- [ ] `bundle exec fastlane ios test_and_notify` 실행 성공
- [ ] Jest 68 tests 통과 출력 확인
- [ ] Slack webhook URL 없을 때 알림 스킵 동작 확인
- [ ] `.env`는 git에 포함되지 않음 확인
- [ ] `.env.example`은 git에 포함됨 확인
