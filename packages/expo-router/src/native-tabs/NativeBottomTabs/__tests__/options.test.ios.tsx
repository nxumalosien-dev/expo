import React from 'react';
import { View } from 'react-native';
import { BottomTabsScreen as _BottomTabsScreen } from 'react-native-screens';

import { screen, renderRouter } from '../../../testing-library';
import { Badge, Icon, Label } from '../../common/elements';
import { NativeTabs } from '../NativeTabs';
import type { NativeTabOptions } from '../NativeTabsView';

jest.mock('react-native-screens', () => {
  const { View }: typeof import('react-native') = jest.requireActual('react-native');
  return {
    ...(jest.requireActual('react-native-screens') as typeof import('react-native-screens')),
    BottomTabs: jest.fn(({ children }) => <View testID="BottomTabs">{children}</View>),
    BottomTabsScreen: jest.fn(({ children }) => <View testID="BottomTabsScreen">{children}</View>),
  };
});

const BottomTabsScreen = _BottomTabsScreen as jest.MockedFunction<typeof _BottomTabsScreen>;

it('can pass options via options prop', () => {
  const indexOptions: NativeTabOptions = {
    title: 'Test Title',
    tabBarItemIconColor: 'blue',
  };
  const secondOptions: NativeTabOptions = {
    title: 'Second Title',
    tabBarItemIconColor: 'red',
  };
  renderRouter({
    _layout: () => (
      <NativeTabs>
        <NativeTabs.Trigger name="index" options={{ ...indexOptions }} />
        <NativeTabs.Trigger name="second" options={{ ...secondOptions }} />
      </NativeTabs>
    ),
    index: () => <View testID="index" />,
    second: () => <View testID="second" />,
  });

  expect(screen.getByTestId('index')).toBeVisible();
  expect(screen.getByTestId('second')).toBeVisible();
  expect(BottomTabsScreen).toHaveBeenCalledTimes(2);
  expect(BottomTabsScreen.mock.calls[0][0]).toMatchObject({
    ...indexOptions,
  });
  expect(BottomTabsScreen.mock.calls[1][0]).toMatchObject({
    ...secondOptions,
  });
});

it('can pass options via elements', () => {
  renderRouter({
    _layout: () => (
      <NativeTabs>
        <NativeTabs.Trigger name="index">
          <Icon.SF name="homepod.2.fill" />
        </NativeTabs.Trigger>
      </NativeTabs>
    ),
    index: () => <View testID="index" />,
  });

  expect(screen.getByTestId('index')).toBeVisible();
  expect(BottomTabsScreen).toHaveBeenCalledTimes(1);
  expect(BottomTabsScreen.mock.calls[0][0]).toMatchObject({
    icon: { sfSymbolName: 'homepod.2.fill' },
  } as NativeTabOptions);
});

it('when no options are passed, default ones are used', () => {
  const { BottomTabsScreen } = require('react-native-screens');
  renderRouter({
    _layout: () => (
      <NativeTabs>
        <NativeTabs.Trigger name="index" />
      </NativeTabs>
    ),
    index: () => <View testID="index" />,
  });

  expect(screen.getByTestId('index')).toBeVisible();
  expect(BottomTabsScreen).toHaveBeenCalledTimes(1);
  expect(Object.keys(BottomTabsScreen.mock.calls[0][0])).toEqual([
    'hidden',
    'specialEffects',
    'tabKey',
    'isFocused',
    'children',
  ]);
  expect(BottomTabsScreen.mock.calls[0][0]).toMatchObject({
    hidden: false,
    specialEffects: {},
    tabKey: expect.stringMatching(/^index-[-\w]+/),
    isFocused: true,
    children: expect.objectContaining({}),
  } as NativeTabOptions);
});

describe('Icons', () => {
  it('when using Icon.SF with name prop, it is passed as sfSymbolName', () => {
    renderRouter({
      _layout: () => (
        <NativeTabs>
          <NativeTabs.Trigger name="index">
            <Icon.SF name="homepod.2.fill" />
          </NativeTabs.Trigger>
        </NativeTabs>
      ),
      index: () => <View testID="index" />,
    });

    expect(screen.getByTestId('index')).toBeVisible();
    expect(BottomTabsScreen).toHaveBeenCalledTimes(1);
    expect(BottomTabsScreen.mock.calls[0][0]).toMatchObject({
      icon: { sfSymbolName: 'homepod.2.fill' },
    } as NativeTabOptions);
  });

  it('when using Icon.SF with useAsSelected prop, it is passed as selected icon sfSymbolName', () => {
    renderRouter({
      _layout: () => (
        <NativeTabs>
          <NativeTabs.Trigger name="index">
            <Icon.SF name="homepod.2.fill" useAsSelected />
          </NativeTabs.Trigger>
        </NativeTabs>
      ),
      index: () => <View testID="index" />,
    });

    expect(screen.getByTestId('index')).toBeVisible();
    expect(BottomTabsScreen).toHaveBeenCalledTimes(1);
    expect(BottomTabsScreen.mock.calls[0][0]).toMatchObject({
      selectedIcon: { sfSymbolName: 'homepod.2.fill' },
    } as NativeTabOptions);
  });

  it('when using Icon.SF with and without useAsSelected prop, value is passed correctly', () => {
    renderRouter({
      _layout: () => (
        <NativeTabs>
          <NativeTabs.Trigger name="index">
            <Icon.SF name="stairs" />
            <Icon.SF name="homepod.2.fill" useAsSelected />
          </NativeTabs.Trigger>
        </NativeTabs>
      ),
      index: () => <View testID="index" />,
    });

    expect(screen.getByTestId('index')).toBeVisible();
    expect(BottomTabsScreen).toHaveBeenCalledTimes(1);
    expect(BottomTabsScreen.mock.calls[0][0]).toMatchObject({
      selectedIcon: { sfSymbolName: 'homepod.2.fill' },
      icon: { sfSymbolName: 'stairs' },
    } as NativeTabOptions);
  });

  it('when using Icon.Drawable on iOS, no value is passed', () => {
    renderRouter({
      _layout: () => (
        <NativeTabs>
          <NativeTabs.Trigger name="index">
            <Icon.Drawable name="stairs" />
          </NativeTabs.Trigger>
        </NativeTabs>
      ),
      index: () => <View testID="index" />,
    });

    expect(screen.getByTestId('index')).toBeVisible();
    expect(BottomTabsScreen).toHaveBeenCalledTimes(1);
    expect(BottomTabsScreen.mock.calls[0][0]).not.toHaveProperty('icon');
    expect(BottomTabsScreen.mock.calls[0][0]).not.toHaveProperty('iconResourceName');
  });

  it('uses last Icon.SF value when multiple are provided', () => {
    renderRouter({
      _layout: () => (
        <NativeTabs>
          <NativeTabs.Trigger name="index">
            <Icon.SF name="stairs" />
            <Icon.SF name="homepod.2.fill" />
          </NativeTabs.Trigger>
        </NativeTabs>
      ),
      index: () => <View testID="index" />,
    });

    expect(screen.getByTestId('index')).toBeVisible();
    expect(BottomTabsScreen).toHaveBeenCalledTimes(1);
    expect(BottomTabsScreen.mock.calls[0][0]).toMatchObject({
      icon: { sfSymbolName: 'homepod.2.fill' },
    } as NativeTabOptions);
  });

  it('uses last Icon.SF with useAsSelected when multiple are provided', () => {
    renderRouter({
      _layout: () => (
        <NativeTabs>
          <NativeTabs.Trigger name="index">
            <Icon.SF name="stairs" useAsSelected />
            <Icon.SF name="homepod.2.fill" useAsSelected />
          </NativeTabs.Trigger>
        </NativeTabs>
      ),
      index: () => <View testID="index" />,
    });

    expect(screen.getByTestId('index')).toBeVisible();
    expect(BottomTabsScreen).toHaveBeenCalledTimes(1);
    expect(BottomTabsScreen.mock.calls[0][0]).toMatchObject({
      selectedIcon: { sfSymbolName: 'homepod.2.fill' },
    } as NativeTabOptions);
  });

  it('uses last Icon.SF for each type when multiple are provided', () => {
    renderRouter({
      _layout: () => (
        <NativeTabs>
          <NativeTabs.Trigger name="index">
            <Icon.SF name="stairs" useAsSelected />
            <Icon.SF name="water.waves" useAsSelected />
            <Icon.SF name="homepod.2.fill" />
            <Icon.SF name="0.circle.ar" />
          </NativeTabs.Trigger>
        </NativeTabs>
      ),
      index: () => <View testID="index" />,
    });

    expect(screen.getByTestId('index')).toBeVisible();
    expect(BottomTabsScreen).toHaveBeenCalledTimes(1);
    expect(BottomTabsScreen.mock.calls[0][0]).toMatchObject({
      selectedIcon: { sfSymbolName: 'water.waves' },
      icon: { sfSymbolName: '0.circle.ar' },
    } as NativeTabOptions);
  });

  it('throws an error when Icon and Icon.SF are mixed with different useAsSelected', () => {
    expect(() =>
      renderRouter({
        _layout: () => (
          <NativeTabs>
            <NativeTabs.Trigger name="index">
              <Icon src={require('../../../../assets/file.png')} />
              <Icon.SF name="stairs" useAsSelected />
            </NativeTabs.Trigger>
          </NativeTabs>
        ),
        index: () => <View testID="index" />,
      })
    ).toThrow('You can only use one type of icon (Icon or Icon.SF) for a single tab');
  });

  it('throws an error when Icon and Icon.SF are mixed', () => {
    expect(() =>
      renderRouter({
        _layout: () => (
          <NativeTabs>
            <NativeTabs.Trigger name="index">
              <Icon src={require('../../../../assets/file.png')} />
              <Icon.SF name="stairs" />
            </NativeTabs.Trigger>
          </NativeTabs>
        ),
        index: () => <View testID="index" />,
      })
    ).toThrow('You can only use one type of icon (Icon or Icon.SF) for a single tab');
  });
});

describe('Badge', () => {
  it('passes badge value via Badge element', () => {
    renderRouter({
      _layout: () => (
        <NativeTabs>
          <NativeTabs.Trigger name="index">
            <Badge>5</Badge>
          </NativeTabs.Trigger>
        </NativeTabs>
      ),
      index: () => <View testID="index" />,
    });

    expect(screen.getByTestId('index')).toBeVisible();
    expect(BottomTabsScreen).toHaveBeenCalledTimes(1);
    expect(BottomTabsScreen.mock.calls[0][0]).toMatchObject({
      badgeValue: '5',
    } as NativeTabOptions);
  });

  it('passes badge value as string', () => {
    renderRouter({
      _layout: () => (
        <NativeTabs>
          <NativeTabs.Trigger name="index">
            <Badge>New</Badge>
          </NativeTabs.Trigger>
        </NativeTabs>
      ),
      index: () => <View testID="index" />,
    });

    expect(screen.getByTestId('index')).toBeVisible();
    expect(BottomTabsScreen).toHaveBeenCalledTimes(1);
    expect(BottomTabsScreen.mock.calls[0][0]).toMatchObject({
      badgeValue: 'New',
    } as NativeTabOptions);
  });

  it('does not pass badge when Badge is not used', () => {
    renderRouter({
      _layout: () => (
        <NativeTabs>
          <NativeTabs.Trigger name="index" />
        </NativeTabs>
      ),
      index: () => <View testID="index" />,
    });

    expect(screen.getByTestId('index')).toBeVisible();
    expect(BottomTabsScreen).toHaveBeenCalledTimes(1);
    expect(BottomTabsScreen.mock.calls[0][0]).not.toHaveProperty('badge');
  });

  it('uses last Badge value when multiple are provided', () => {
    renderRouter({
      _layout: () => (
        <NativeTabs>
          <NativeTabs.Trigger name="index">
            <Badge>1</Badge>
            <Badge>2</Badge>
            <Badge>3</Badge>
          </NativeTabs.Trigger>
        </NativeTabs>
      ),
      index: () => <View testID="index" />,
    });

    expect(screen.getByTestId('index')).toBeVisible();
    expect(BottomTabsScreen).toHaveBeenCalledTimes(1);
    expect(BottomTabsScreen.mock.calls[0][0]).toMatchObject({
      badgeValue: '3',
    } as NativeTabOptions);
  });
});

describe('Title', () => {
  it('passes title via Title element', () => {
    renderRouter({
      _layout: () => (
        <NativeTabs>
          <NativeTabs.Trigger name="index">
            <Label>Custom Title</Label>
          </NativeTabs.Trigger>
        </NativeTabs>
      ),
      index: () => <View testID="index" />,
    });

    expect(screen.getByTestId('index')).toBeVisible();
    expect(BottomTabsScreen).toHaveBeenCalledTimes(1);
    expect(BottomTabsScreen.mock.calls[0][0]).toMatchObject({
      title: 'Custom Title',
    } as NativeTabOptions);
  });

  it('does not pass title when Title is not used', () => {
    renderRouter({
      _layout: () => (
        <NativeTabs>
          <NativeTabs.Trigger name="index" />
        </NativeTabs>
      ),
      index: () => <View testID="index" />,
    });

    expect(screen.getByTestId('index')).toBeVisible();
    expect(BottomTabsScreen).toHaveBeenCalledTimes(1);
    expect(BottomTabsScreen.mock.calls[0][0]).not.toHaveProperty('title');
  });

  it('uses last Title value when multiple are provided', () => {
    renderRouter({
      _layout: () => (
        <NativeTabs>
          <NativeTabs.Trigger name="index">
            <Label>First Title</Label>
            <Label>Second Title</Label>
            <Label>Last Title</Label>
          </NativeTabs.Trigger>
        </NativeTabs>
      ),
      index: () => <View testID="index" />,
    });

    expect(screen.getByTestId('index')).toBeVisible();
    expect(BottomTabsScreen).toHaveBeenCalledTimes(1);
    expect(BottomTabsScreen.mock.calls[0][0]).toMatchObject({
      title: 'Last Title',
    } as NativeTabOptions);
  });
});
