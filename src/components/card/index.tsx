/* eslint-disable prettier/prettier */
import React from 'react';
import { ContainerCard } from './styles';
import Animated, { Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated/src/reanimated2/core';
import images from '../../utils/images';

interface Props {
    index: number,
    onSwipe: () => void
}

const Card = ({index, onSwipe}: Props, ) => {
    const posX = useSharedValue(0);
    const posY = useSharedValue(0);

    const rotation = useDerivedValue(() => {
        return interpolate(posX.value,
            [-100,0, 100],
            [-30, 0, 30],
            Extrapolate.CLAMP
        )
    });

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(){},
        onActive(event){
            posX.value = event.translationX;
            posY.value = event.translationY;
        },
        onEnd(){
            posX.value = withTiming(0);
            posY.value = withTiming(0);

            if ( posX.value > 150 || posX.value < -150 ){
                posX.value = withTiming(posX.value * 4, {duration: 300}, (finished) => {
                    if (finished) {
                        runOnJS(onSwipe)();
                    }
                });
            }

            if ( posY.value > 150 || posY.value < -150 ){
                posY.value = withTiming(posY.value * 4, {duration: 300}, (finished) => {
                    if (finished) {
                        runOnJS(onSwipe)();
                    }
                });
            } 
        },
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: posX.value},
                {translateY: posY.value},
                {rotate: rotation.value + "deg"},
                {scale: interpolate(
                    posX.value,
                    [-100 ,0, 100],
                    [0.85 ,1, 0.85],
                    Extrapolate.CLAMP
                )}
            ],
        };
    });

    return (
        <GestureHandlerRootView style={{height: "80%", width: "85%", position: "absolute"}}>
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={[animatedStyle, {flex: 1}]}>
                    <ContainerCard index={index} source={{uri: images[index]}}/>
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};

export default Card;
