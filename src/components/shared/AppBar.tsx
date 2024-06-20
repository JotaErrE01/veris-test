import { Appbar } from 'react-native-paper'

interface Props {
  title: string;
  onBackAction?: () => void;
}

export const AppBar = ({ title, onBackAction }: Props) => {
  return (
    <Appbar.Header>
      {
        Boolean(onBackAction) &&
        <Appbar.BackAction onPress={onBackAction} />
      }
      <Appbar.Content title={title} />
    </Appbar.Header>
  )
}
