import React, { useEffect, useState, useContext } from "react";
import { View, StatusBar, StyleSheet, FlatList,  Image, TouchableOpacity } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";
import { type MainItemType } from "../../structdata/MainStruct";
import { Divider, Icon, Text } from "@rneui/themed";
import MainStyle from "../../styles/main/mainstyle";
import { NavigationProp } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

function MainItemUI({ item, drag, isActive, navigation }: RenderItemParams<MainItemType> & {navigation: any}): JSX.Element {

    const styles = MainStyle()
    const { t } = useTranslation()

    const navTo = ()=>{
        if(item.route){
            navigation.navigate(item.route)
        }
    }

    return (
        <>
        <TouchableOpacity
            activeOpacity={1}
            onLongPress={drag}
            onPress={() => navTo()}
            disabled={isActive}
        >
            <View
            style={{
                flex: 1,
                flexDirection: 'row',
                marginVertical: 15,
                marginHorizontal: 10,
                justifyContent: 'space-between'
            }}>
                <Image
                    style={styles.imageThumbnail}
                    source={item.icon} />
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text
                            // style={styles.textColor}
                            numberOfLines={1}
                        >{t(item.name)}</Text>
                        <Icon name='chevron-right'
                        type='material' />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        <Divider />
        </>
    );
}

export default MainItemUI;