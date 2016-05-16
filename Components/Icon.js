let React = require('React');
let {createIconSetFromFontello} = require('react-native-vector-icons');
let config = require('./../Iconfont/config');
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
