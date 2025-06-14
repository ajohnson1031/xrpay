import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import cn from 'classnames';
import { useSetAtom } from 'jotai';
import { Text, TouchableOpacity, View } from 'react-native';

import { currentTxAtom, CurrentTxType } from '~/atoms/transaction';
import TxContactListItem from '~/components/TxContactListItem';
import CoreLayout from '~/layouts/CoreLayout';
import { RootStackParamList } from '~/types/navigation';
import { capitalize, formatWithCommas } from '~/utils';

const TxConfirmationScreen = ({
  route: {
    params: { tx },
  },
  navigation,
}: {
  route: { params: { tx: CurrentTxType } };
  navigation: NativeStackNavigationProp<RootStackParamList, 'TxConfirmation'>;
}) => {
  const setTx = useSetAtom(currentTxAtom);

  const { type, amount, memo, recipient } = tx;

  const title = type === 'PAY' ? 'Confirm\nPayment?' : 'Confirm\nRequest?';

  const handleBackPress = () => {
    setTx((prev) => ({ ...prev, memo: null, recipient: null }));
    navigation.navigate('Contacts');
  };

  return (
    <CoreLayout showBack showHeaderOptions showFooter={false} onBackPress={handleBackPress}>
      <View className="mx-6 flex-1 justify-center gap-y-4">
        <Text className="mb-2 text-5xl font-semibold text-stone-900">{title}</Text>

        <TxContactListItem id={recipient!} />

        {/* Amount Display TODO: Add USD value */}
        <View className="rounded-xl bg-slate-800 p-3 ">
          <Text className="mb-1 font-bold text-sky-300">Tx. Amount:</Text>
          <View className="flex flex-row items-baseline p-3 pt-5">
            <Text className="text-5xl text-white">{formatWithCommas(amount)}</Text>
            <Text className="text-xl font-semibold text-white">XRP</Text>
          </View>
        </View>

        {/* Memo Display */}
        <View className="rounded-lg bg-slate-800 p-3">
          <Text className="mb-2 font-medium text-sky-300">For:</Text>
          <View className="flex flex-row items-baseline rounded-lg p-3">
            <Text className="text-xl font-semibold text-white">{memo}</Text>
          </View>
        </View>

        {/* Action Buttons TODO: Make functional */}
        <View className="mt-8 flex flex-row justify-center gap-x-5">
          <TouchableOpacity
            onPress={() => navigation.navigate('TxFinalConfirmation', { tx })}
            className={cn(
              ' flex w-full flex-row items-center justify-center gap-2 rounded-xl py-4',
              {
                'bg-green-600': type === 'PAY',
                'bg-sky-600': type === 'REQUEST',
              }
            )}>
            <Text className="text-xl font-bold text-white">
              Send {capitalize(type === 'PAY' ? 'Payment' : type)}
            </Text>
            <FontAwesome6 name="arrow-right-long" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </CoreLayout>
  );
};

export default TxConfirmationScreen;
