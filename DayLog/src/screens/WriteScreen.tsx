import React, { useContext, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { v4 as uuidv4 } from 'uuid';
import WriteEditor from '../components/WriteEditor';
import WriteHeader from '../components/WriteHeader';
import LogContext from '../contexts/LogContext';
import { RootStackNavigationProp, RootStackScreenProps } from './RootStack';
import { useNavigation } from '@react-navigation/native';

// RootStackScreenProps<'Write'>로 좁혀서 route.params의 타입을 { log?: LogProps }로 확정
type Prop = RootStackScreenProps<'Write'>;

function WriteScreen({ route }: Prop) {
  // route.params.log가 있으면 수정 모드, 없으면 새 글 작성 모드
  const log = route.params?.log;
  const [title, setTitle] = useState(log?.title ?? '');
  const [body, setBody] = useState(log?.body ?? '');
  const navigation = useNavigation<RootStackNavigationProp>();
  const [date, setDate] = useState(log ? new Date(log.date) : new Date());

  const { onCreate, onModify, onRemove } = useContext(LogContext);

  const onAskRemove = () => {
    Alert.alert(
      '삭제',
      '정말로 삭제하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            onRemove(log!.id);
            navigation.pop();
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const onSave = () => {
    if (log) {
      // log가 존재한다면 수정(onModify), 없다면 새로 작성(onCreate)
      onModify({
        id: log.id,
        date: date.toISOString(),
        title,
        body,
      });
    } else {
      onCreate({
        id: uuidv4(),
        title,
        body,
        date: date.toISOString(),
      });
    }
    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <WriteHeader
          onSave={onSave}
          onAskRemove={onAskRemove}
          isEditing={!!log}
          date={date}
          onChangeDate={setDate}
        />
        <WriteEditor
          title={title}
          body={body}
          onChangeTitle={setTitle}
          onChangeBody={setBody}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default WriteScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoidingView: {
    flex: 1,
  },
});
