import React, { useState, useEffect } from "react";
import { Text, View } from "@tarojs/components";
import { TList } from "../../../../@types/radio";
import { classNames, generateId } from "../../../lib";

interface IProps {
  list: TList;
  checkedValue: String;
  onChange: (value) => void;
  disabled: boolean;
}

export default function ListRadio(props: IProps) {
  const [listState, setListState] = useState(props.list || []);
  useEffect(() => {
    const list = props.list || [];
    setListState(
      list.map((item: any) => {
        item.cu_radio_list_id = generateId();
        return item;
      })
    );
  }, [props.list]);
  const list = listState || [];
  const checkedValue = props.checkedValue;
  const [checked, setChecked] = useState(checkedValue);
  const listComponent = list.map((item: any) => (
    <View
      key={item.cu_radio_list_id}
      className={classNames([
        "cu-item",
        {
          checked: checked === item.value,
          disabled: props.disabled
        }
      ])}
      onClick={() => {
        if (!props.disabled) {
          setChecked(item.value || "");
          props.onChange && props.onChange(item.value);
        }
      }}
    >
      <View className="content flex align-center">
        <Text>{item.key}</Text>
      </View>
    </View>
  ));
  return <View className={`cu-list menu`}>{listComponent}</View>;
}

ListRadio.defaultProps = {
  list: [],
  checkedValue: "",
  onChange: () => {},
  disabled: false
} as IProps;

ListRadio.options = {
  addGlobalClass: true
};
