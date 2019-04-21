import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import {
  bgColorType,
  iconType,
  lightBgColorType,
  bgColorMoreType
} from '../utils/types';
import { BG_COLOR_LIST, SIZE } from '../utils/model';

interface IProps {
  shape?: 'round' | 'radius';
  size?: 'small' | 'normal' | 'large';
  bgColor?: bgColorType | lightBgColorType | bgColorMoreType;
  plain?: boolean;
  plainSize?: 'default' | 'bold';
  shadow?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: iconType;
  long?: boolean;
  text: string;
  openType?:
    | 'contact'
    | 'share'
    | 'getUserInfo'
    | 'getPhoneNumber'
    | 'launchApp'
    | 'openSetting'
    | 'feedback'
    | 'getRealnameAuthInfo';
  onClick?(e: any): void;
  onGetUserInfo?(e: any): void;
  onContact?(e: any): void;
  onGetPhoneNumber?(e: any): void;
  onError?(e: any): void;
  onOpenSetting?(e: any): void;
  onShare?(e: any): void;
  onLaunchApp?(e: any): void;
}

interface IState {}

export default class ClButton extends Component<IProps, IState> {
  static options = {
    addGlobalClass: true
  };
  static defaultProps = {
    shape: 'radius',
    size: 'normal',
    bgColor: 'blue',
    disabled: false,
    icon: undefined,
    loading: false,
    long: false,
    plain: false,
    plainSize: 'default',
    shadow: true,
    openType: undefined
  } as IProps;
  onClick(e: any) {
    this.props.onClick && this.props.onClick(e);
  }
  onOpenSetting(e: any) {
    this.props.onOpenSetting && this.props.onOpenSetting(e);
  }
  onGetUserInfo(e: any) {
    this.props.onGetUserInfo && this.props.onGetUserInfo(e);
  }
  onContact(e: any) {
    this.props.onContact && this.props.onContact(e);
  }
  onGetPhoneNumber(e: any) {
    this.props.onGetPhoneNumber && this.props.onGetPhoneNumber(e);
  }
  onError(e: any) {
    this.props.onError && this.props.onError(e);
  }
  onShare(e: any) {
    this.props.onShare && this.props.onShare(e);
  }
  onLaunchApp(e: any) {
    this.props.onLaunchApp && this.props.onLaunchApp(e);
  }
  render() {
    const shapeClassName = this.props.shape || 'radius';
    const sizeClassName = this.props.size || 'normal';
    const colorClassName = this.props.bgColor || 'blue';
    const disabledClassName = this.props.disabled;
    const iconClassName = this.props.icon || '';
    const loadingClassName = this.props.loading
      ? 'icon-loading2 iconfont-spin'
      : '';
    const longClassName = this.props.long;
    const plainClassName = this.props.plain;
    const plainSizeName = this.props.plainSize === 'default' ? 'line' : 'lines';
    const shadowSizeName = this.props.shadow ? 'shadow' : '';
    const buttonClassName = `cu-btn ${shapeClassName} ${SIZE[sizeClassName]} ${
      BG_COLOR_LIST[colorClassName]
    } ${iconClassName} ${
      plainClassName ? plainSizeName + '-' + BG_COLOR_LIST[colorClassName] : ''
    } ${shadowSizeName}`;
    const normalButton = (
      <Button
        className={buttonClassName}
        disabled={disabledClassName}
        onClick={this.onClick.bind(this)}
        openType={this.props.openType}
        onOpenSetting={this.onOpenSetting}
        onGetUserInfo={this.onGetUserInfo}
        onContact={this.onContact}
        onGetPhoneNumber={this.onGetPhoneNumber}
        onError={this.onError}
        onShare={this.onShare}
        onLaunchApp={this.onLaunchApp}
      >
        <Text className={loadingClassName} />
        <Text>{this.props.text}</Text>
      </Button>
    );
    const longButton = (
      <View className='flex flex-direction'>{normalButton}</View>
    );
    return longClassName ? longButton : normalButton;
  }
}