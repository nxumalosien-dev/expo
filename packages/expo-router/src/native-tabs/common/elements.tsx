import type { ImageSourcePropType } from 'react-native';
import type { SFSymbol } from 'sf-symbols-typescript';

interface LabelProps {
  children?: string;
}

export function Label(props: LabelProps) {
  return null;
}

interface SFIconProps {
  useAsSelected?: boolean;
  name: SFSymbol;
}

export function SFIcon(props: SFIconProps) {
  return null;
}

interface DrawableIconProps {
  name: string;
}

export function DrawableIcon(props: DrawableIconProps) {
  return null;
}

interface IconProps {
  useAsSelected?: boolean;
  src: ImageSourcePropType;
}

export const Icon = Object.assign(
  (props: IconProps) => {
    return null;
  },
  {
    SF: SFIcon,
    Drawable: DrawableIcon,
  }
);

interface BadgeProps {
  children?: string;
}

export function Badge(props: BadgeProps) {
  return null;
}
