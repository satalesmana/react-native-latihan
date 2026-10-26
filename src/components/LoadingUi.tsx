import { ActivityIndicator, Modal, View } from "react-native";

interface LoadingProps {
  visible: boolean;
}

export default function Loading({ visible }: LoadingProps) {
  return (
    <Modal
      animationType="fade"
      onRequestClose={() => {}}
      statusBarTranslucent
      transparent
      visible={visible}
    >
      <View
        className="flex-1 items-center justify-center bg-black/40"
        accessibilityViewIsModal
      >
        <View className="h-20 w-20 items-center justify-center rounded-2xl bg-white">
          <ActivityIndicator
            size="large"
            color="#1F41BB"
            accessibilityLabel="Memuat"
          />
        </View>
      </View>
    </Modal>
  );
}