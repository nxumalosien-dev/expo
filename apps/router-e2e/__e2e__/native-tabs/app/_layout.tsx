import { ThemeProvider, DarkTheme } from '@react-navigation/native';
import { Badge, Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { Appearance, Platform } from 'react-native';

Appearance.setColorScheme('dark');

export default function Layout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <NativeTabs
        style={{
          // fontSize: 16,
          // fontWeight: 700,
          // fontStyle: 'italic',
          // fontFamily: 'Courier New',
          backgroundColor: Platform.OS === 'android' ? 'black' : undefined,
          // badgeBackgroundColor: 'green',
          // color: 'blue',
          tintColor: 'orange',
          blurEffect: 'systemChromeMaterial',
          labelVisibilityMode: 'auto',
          rippleColor: 'orange',
          iconColor: Platform.OS === 'android' ? '#888' : undefined,
          color: Platform.OS === 'android' ? '#888' : undefined,
          '&:active': {
            fontSize: 14,
            indicatorColor: 'black',
          },
        }}
        minimizeBehavior="onScrollDown">
        <NativeTabs.Trigger
          name="index"
          options={{
            icon: { sfSymbolName: 'applewatch.side.right' },
            iconResourceName: 'ic_phone',
            title: 'My Watch',
          }}
        />
        <NativeTabs.Trigger name="faces" options={{ title: 'Face Gallery' }} popToRoot>
          <Icon.SF name="lock.applewatch" />
          <Icon.SF name="lock.open.applewatch" useAsSelected />
          <Icon.Drawable name="ic_lock_open" />
          <Label>Face Gallery</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="four">
          <Icon src={require('../../../assets/explore_gray.png')} />
          <Icon src={require('../../../assets/explore_orange.png')} useAsSelected />
          {/* <Icon.SF name="safari.fill" />
          <Icon.SF name="safari.fill" useAsSelected /> */}
          <Icon.Drawable name="ic_search" />
          <Badge>9+</Badge>
          <Label>Discover</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </ThemeProvider>
  );
}
