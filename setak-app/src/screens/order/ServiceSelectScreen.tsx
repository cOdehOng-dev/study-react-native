import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OrderStackParamList} from '../../types/navigation';
import Header from '../../components/common/Header';
import {useOrder} from '../../context/OrderContext';
import {mockServices} from '../../data/mockServices';
import {Service} from '../../types/models';
import {colors, spacing, fontSize, radius} from '../../constants/theme';

type Props = NativeStackScreenProps<OrderStackParamList, 'ServiceSelect'>;

const ServiceSelectScreen: React.FC<Props> = ({navigation}) => {
  const {setService, currentOrder} = useOrder();

  const handleSelect = (service: Service) => {
    setService(service);
    navigation.navigate('Quantity');
  };

  return (
    <View style={styles.container}>
      <Header title="서비스 선택" />
      <FlatList
        data={mockServices}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.item,
              currentOrder.service?.id === item.id && styles.itemSelected,
            ]}
            onPress={() => handleSelect(item)}>
            <Text style={styles.icon}>{item.icon}</Text>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>{item.description}</Text>
            </View>
            <Text style={styles.price}>{item.pricePerItem.toLocaleString()}원~</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  list: {padding: spacing.md, gap: spacing.sm},
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    gap: spacing.md,
  },
  itemSelected: {borderColor: colors.primary, backgroundColor: '#EFF6FF'},
  icon: {fontSize: 32},
  info: {flex: 1},
  name: {fontSize: fontSize.md, fontWeight: '700', color: colors.text},
  desc: {fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2},
  price: {fontSize: fontSize.md, fontWeight: '700', color: colors.primary},
});

export default ServiceSelectScreen;
