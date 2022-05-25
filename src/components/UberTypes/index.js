import React from "react";
import { View, Text, Pressable } from "react-native";

import styles from './styles';
import UberTypesRow from "../UberTypeRow";

import typesData from '../../assets/data/types';
// import types from "../../assets/data/types";

const UberTypes = ({ typeState, onSubmit }) => {
    const [selectedType, setSelectedType] = typeState;

    const confirm = () => {
        console.warn('confirm');
    };

    return (
        <View>
            {typesData.map((type) => (
                <UberTypesRow 
                type={type}
                key={type.id}
                isSelected={type.type === selectedType}
                onPress={() => setSelectedType(type.type)}
                />
            ))}
            <Pressable onPress={onSubmit} style={{
                backgroundColor: 'black',
                padding: 10,
                margin: 10,
                alignItems: 'center',
            }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Confirm Pravaig
                </Text>
            </Pressable>
        </View>
    );
};

export default UberTypes;