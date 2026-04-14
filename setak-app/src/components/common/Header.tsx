import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors, spacing, fontSize} from '../../constants/theme';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({title, onBack, rightElement}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backIcon}>{'←'}</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.right}>{rightElement ?? null}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.md,
  },
  left: {width: 40},
  right: {width: 40, alignItems: 'flex-end'},
  title: {flex: 1, textAlign: 'center', fontSize: fontSize.lg, fontWeight: '700', color: colors.text},
  backButton: {padding: spacing.sm},
  backIcon: {fontSize: 20, color: colors.text},
});

export default Header;
