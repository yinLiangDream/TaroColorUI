import React, { Component, useEffect, useState } from "react";
import { View } from "@tarojs/components";
import { classNames } from "../../../lib";
import { IProps } from "../../../../@types/formItem";
// import { FormContext } from '../index'
import defaultRules from "../../../lib/rules";

import context from "../context";
import "./index.scss";

export default class ClFormItem extends Component<IProps> {
  // static contextType = FormContext
  static defaultProps: IProps = {
    prop: "",
    required: false
  };
  render() {
    const [tip, setTip] = useState("");
    const [err, setErr] = useState(false);
    const [firstInit, setFirstInit] = useState(true);
    const [flag, setFlag] = useState(true);
    const [message, setMessage] = useState("");
    const [beforeModelData, setBeforeModelData] = useState({});
    const { prop, required } = this.props;
    const modelData = context.inject("model") || {};
    const rulesData = context.inject("rules") || {};
    const value = modelData[prop || ""] || "";
    const ruleFunc =
      rulesData[prop || ""] ||
      function() {
        return true;
      };
    // let message = ''
    const callback = (str: string = "") => {
      setMessage(str);
      // message = str
    };
    // let flag = true;
    useEffect(() => {
      if (firstInit) setFirstInit(false);
    }, []);
    useEffect(() => {
      if (firstInit) {
        setBeforeModelData(modelData);
      } else {
        Object.keys(modelData).forEach(key => {
          if (beforeModelData[key] !== modelData[key] && prop === key) {
            setFlag(ruleFunc(defaultRules, value, callback));
          }
        });
        setBeforeModelData(modelData);
      }
    }, [modelData]);
    useEffect(() => {
      setErr(!flag);
    }, [flag]);
    useEffect(() => {
      setTip(message);
    }, [message]);
    return (
      <View
        className={classNames(
          err ? "cu-formItem-err" : "cu-formItem",
          this.props.className
        )}
        style={Object.assign({}, this.props.style)}
      >
        {this.props.children}
        {err ? <View className="cu-formItem-err-tip">{tip}</View> : ""}
        {required ? <View className="cu-formItem-required" /> : ""}
      </View>
    );
  }
}
