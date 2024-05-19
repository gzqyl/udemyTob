import React, { useEffect, useState, useContext, useCallback } from "react";
import { Button, Divider, ListItem, Text } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { NoteItemType } from "../../../structdata/NoteItemType";
import NoteStyle from "../../../styles/notes/notestyle";

function NoteItem({item, delByHashId,navToDetail}: {item: NoteItemType, delByHashId: (hashId: string) => Promise<void>, navToDetail: (hashId: string) => void}): JSX.Element{

    const styles = NoteStyle()

    const { t } = useTranslation()

    return (
        <ListItem.Swipeable
            key={item.hashId}
            rightContent={() => (
                <Button
                containerStyle={{
                    flex: 1,
                    justifyContent: "center",
                    backgroundColor: "red",
                }}
                type="clear"
                title={t("Delete")}
                titleStyle={{color: 'white'}}
                onPress={async ()=> await delByHashId(item.hashId)}
                />
            )}
            onPress={()=>navToDetail(item.hashId)}
        >
        <ListItem.Content>
          <ListItem.Title style={styles.listTitle} numberOfLines={1}>
            {item.title}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.subTitle}>
            {item.createTime}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem.Swipeable>)


}

export default NoteItem;