import type { ImageSourcePropType } from 'react-native';
import type { SFSymbol } from 'sf-symbols-typescript';
interface LabelProps {
    children?: string;
}
export declare function Label(props: LabelProps): null;
interface SFIconProps {
    useAsSelected?: boolean;
    name: SFSymbol;
}
export declare function SFIcon(props: SFIconProps): null;
interface DrawableIconProps {
    name: string;
}
export declare function DrawableIcon(props: DrawableIconProps): null;
interface IconProps {
    useAsSelected?: boolean;
    src: ImageSourcePropType;
}
export declare const Icon: ((props: IconProps) => null) & {
    SF: typeof SFIcon;
    Drawable: typeof DrawableIcon;
};
interface BadgeProps {
    children?: string;
}
export declare function Badge(props: BadgeProps): null;
export {};
//# sourceMappingURL=elements.d.ts.map