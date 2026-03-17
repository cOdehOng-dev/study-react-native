import { useNavigation } from '@react-navigation/native';
import React, { useReducer, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { RootStackNavigationProp } from '../screens/RootStack';
import TransParentCircleButton from './TransParentCircleButton';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type Props = {
  onSave: () => void;
  onAskRemove: () => void;
  isEditing: boolean;
  date: Date;
  onChangeDate: (date: Date) => void;
};

const initialState = {
  mode: 'date' as 'date' | 'time' | 'datetime',
  visible: false,
};
function reducer(state, action) {
  switch (action.type) {
    case 'open':
      return {
        mode: action.mode,
        visible: true,
      };
    case 'close':
      return {
        ...state,
        visible: false,
      };
    default:
      throw new Error('Unhandled action type');
  }
}

function WriteHeader({
  onSave,
  onAskRemove,
  isEditing,
  date,
  onChangeDate,
}: Props) {
  // RootStackNavigationProp을 제네릭으로 전달해 pop 등 네비게이션 메서드의 타입 안전성 확보
  const navigation = useNavigation<RootStackNavigationProp>();
  const onGoBack = () => {
    // 뒤로가기 버튼 누를 때 Write 화면을 스택에서 제거하고 이전 화면(MainTab)으로 돌아감
    navigation.pop();
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const open = mode => dispatch({ type: 'open', mode });
  const close = () => dispatch({ type: 'close' });

  const onConfirm = (selectedDate: Date) => {
    close();
    onChangeDate(selectedDate);
  };

  return (
    <View style={styles.block}>
      <View style={styles.iconButtonWrppaer}>
        <TransParentCircleButton
          onPress={onGoBack}
          name="arrow-back"
          color="#424242"
        />
      </View>

      <View style={styles.center}>
        <Pressable onPress={() => open('date')}>
          <Text>
            {format(new Date(date), 'PPP', {
              locale: ko,
            })}
          </Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable onPress={() => open('time')}>
          <Text>{format(new Date(date), 'p', { locale: ko })}</Text>
        </Pressable>
      </View>
      <DateTimePickerModal
        isVisible={state.visible}
        mode={state.mode}
        date={date}
        onConfirm={onConfirm}
        onCancel={close}
      />

      <View style={styles.buttons}>
        {isEditing && (
          <TransParentCircleButton
            name="delete-forever"
            color="#ef5350"
            hasMarginRight
            onPress={onAskRemove}
          />
        )}

        <TransParentCircleButton
          name="check"
          color="#009688"
          onPress={onSave}
        />
      </View>
    </View>
  );
}

export default WriteHeader;

const styles = StyleSheet.create({
  block: {
    height: 48,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButtonWrppaer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 8,
  },
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    flexDirection: 'row',
  },
  separator: {
    width: 8,
  },
});
