import * as React from 'react';
import { Text, View, Animated, TouchableOpacity, Image } from 'react-native';

interface AnimatedButtonProps {
    text: string,
    onPress: any,
    isCorrect: boolean | null,
    disabled:boolean;
}


const AnimatedButton = (props: AnimatedButtonProps) => {

    const [animation, setAnimation] = React.useState(new Animated.Value(0))
    const [toValue, setToValue] = React.useState(100)
    const [showImage, setShowImage] = React.useState(false)

    React.useEffect(() => {
        if (props.isCorrect != null) {
            Animated.timing(animation, {
                toValue: toValue,
                duration: 500,
                useNativeDriver: false
            }).start();
            setTimeout(() => {
                setShowImage(true)
            }, 400);
        }

    }, [props.isCorrect, toValue])

    const gifSrc = props.isCorrect ? require('../../assets/correct.gif') : require('../../assets/wrong.gif');
    const backgroundColor = props.isCorrect ? 'rgba(5, 128, 93,0.7)' : 'rgba(230, 7, 37,0.7)'
    return (
        <TouchableOpacity disabled={props.disabled} style={{ height: 65, width: '90%', marginTop:16 }} onPress={props.onPress}>

            <View onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setToValue(width)
            }} style={{ backgroundColor: 'rgba(255,255,255,0.5)', height: 65, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                <Animated.View style={{ backgroundColor: backgroundColor, position: 'absolute', height: 65, width: animation, borderRadius: 5, }}>
                </Animated.View>
                <Text style={{
                    color: 'white', textShadowColor: 'rgba(0, 0, 0, 1)',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 2,
                    fontWeight: 'bold',
                    marginRight:22,
                    width:'85%'
                }}>{props.text}</Text>

            </View>

            {showImage && <Image style={{ width: 50, height: 50, alignSelf: 'center', position: 'absolute', right: -5,marginTop:props.isCorrect === false ?15 : 0, transform:[{rotate:props.isCorrect === false ? '180deg' : '0deg'}] }} source={gifSrc} />}


        </TouchableOpacity>
    );
}


export default AnimatedButton;