"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabTrigger = TabTrigger;
exports.convertTabPropsToOptions = convertTabPropsToOptions;
exports.isTab = isTab;
const react_1 = require("react");
const utils_1 = require("./utils");
const elements_1 = require("../common/elements");
function TabTrigger(props) {
    return null;
}
function convertTabPropsToOptions({ options, hidden, children, popToRoot, disableScrollToTop, }) {
    const initialOptions = {
        ...options,
        hidden: !!hidden,
        specialEffects: {
            repeatedTabSelection: {
                popToRoot: !!popToRoot,
                scrollToTop: !disableScrollToTop,
            },
        },
    };
    const allowedChildren = (0, utils_1.filterAllowedChildrenElements)(children, [
        elements_1.Badge,
        elements_1.Label,
        elements_1.Icon,
        elements_1.Icon.SF,
        elements_1.Icon.Drawable,
    ]);
    return allowedChildren.reduce((acc, child) => {
        if ((0, utils_1.isChildOfType)(child, elements_1.Badge)) {
            if (child.props.children) {
                acc.badgeValue = String(child.props.children);
            }
            // if (child.props.style?.backgroundColor) {
            //   acc.tabBarItemBadgeBackgroundColor = child.props.style.backgroundColor;
            // }
        }
        else if ((0, utils_1.isChildOfType)(child, elements_1.Label)) {
            acc.title = child.props.children;
        }
        else if ((0, utils_1.isChildOfType)(child, elements_1.Icon)) {
            const icon = {
                imageSource: child.props.src,
            };
            if (acc.icon && 'sfSymbolName' in acc.icon) {
                // This is forbidden by screens
                throw new Error('You can only use one type of icon (Icon or Icon.SF) for a single tab');
            }
            if ('useAsSelected' in child.props && child.props.useAsSelected) {
                acc.selectedIcon = icon;
            }
            else {
                acc.icon = icon;
            }
        }
        else if ((0, utils_1.isChildOfType)(child, elements_1.Icon.SF) && process.env.EXPO_OS === 'ios') {
            const icon = {
                sfSymbolName: child.props.name,
            };
            if (acc.icon && 'imageSource' in acc.icon) {
                // This is forbidden by screens
                throw new Error('You can only use one type of icon (Icon or Icon.SF) for a single tab');
            }
            if ('useAsSelected' in child.props && child.props.useAsSelected) {
                acc.selectedIcon = icon;
            }
            else {
                acc.icon = icon;
            }
        }
        else if ((0, utils_1.isChildOfType)(child, elements_1.Icon.Drawable) && process.env.EXPO_OS === 'android') {
            acc.iconResourceName = child.props.name;
        }
        return acc;
    }, { ...initialOptions });
}
function isTab(child, contextKey) {
    if ((0, react_1.isValidElement)(child) && child && child.type === TabTrigger) {
        if (typeof child.props === 'object' &&
            child.props &&
            'name' in child.props &&
            !child.props.name) {
            throw new Error(`<Screen /> component in \`default export\` at \`app${contextKey}/_layout\` must have a \`name\` prop when used as a child of a Layout Route.`);
        }
        if (process.env.NODE_ENV !== 'production') {
            if (['component', 'getComponent'].some((key) => child.props && typeof child.props === 'object' && key in child.props)) {
                throw new Error(`<Screen /> component in \`default export\` at \`app${contextKey}/_layout\` must not have a \`component\` or \`getComponent\` prop when used as a child of a Layout Route`);
            }
        }
        return true;
    }
    return false;
}
//# sourceMappingURL=TabOptions.js.map