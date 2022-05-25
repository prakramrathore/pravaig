import React from "react";
import { View, Text, Image, Pressable } from "react-native";

import styles from './styles';

import Iconicons from "react-native-vector-icons/Ionicons";
// import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const UberTypesRow = (props) => {
    const {type, onPress, isSelected} = props;

    const getImage = () => {
        if (type.type === 'UberX'){
            return require('../../assets/images/UberX.jpeg')
        }
        if (type.type === 'Comfort') {
            return require('../../assets/images/Comfort.jpeg')
        }
        return require('../../assets/images/UberXL.jpeg')
    }
    return (
        <Pressable
            onPress={onPress} 
            style={[styles.container, {
                backgroundColor: isSelected ? '#efefef' : 'white',
            }]}>

            <Image style={styles.image} source={getImage()}/>
            <View style={styles.middleContainer}>
                <Text style={styles.type}>
                    {type.type}{' '}
                    <Iconicons name={'person'} size={12} />
                    3
                </Text>
                <Text style={styles.time}>
                    8:03PM drop off
                </Text>
            </View>

            <View style={styles.rigthContainer}>
                <Iconicons name={'pricetag'} size={18} color={'#42d742'} />
                <Text style={styles.price}>est. ${type.price}</Text>
            </View>
        </Pressable>
    );
};

export default UberTypesRow;