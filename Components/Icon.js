import React from 'React';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import config from './../Iconfont/config';
let Icon = createIconSetFromFontello(config);

let icon = ({src, size, color}) => (
    <Icon name={src} size={size || 30} color={color || '#999'} />
);

icon.propTypes = {
    src: React.PropTypes.string.isRequired,
    size: React.PropTypes.number,
    color: React.PropTypes.string
};

module.exports = icon;
