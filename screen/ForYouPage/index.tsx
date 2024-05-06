import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PagerView from 'react-native-pager-view';
import { Image as ExpoImage } from 'expo-image';
import {
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import HomeIcon from '../../assets/home.svg'
import DiscoverIcon from '../../assets/discover.svg'
import ActivityIcon from '../../assets/activity.svg'
import BookmarkIcon from '../../assets/bookmark.svg'
import ProfileIcon from '../../assets/profile.svg'
import SearchIcon from '../../assets/search.svg'
import HeartIcon from '../../assets/heart.svg'
import CommentIcon from '../../assets/comment.svg'
import ShareIcon from '../../assets/share.svg'
import PlaylistIcon from '../../assets/playlist.svg'
import PlusIcon from '../../assets/plus.svg'
import AnimatedButton from '../components/AnimatedButton';


type ForYouData = {
    description: string;
    id:number;
    image:string;
    playlist:string;
    question:string;
    type:string;
    options:Options[],
    user:User
}

type Options = {
    id:string;
    answer:string;
}

type Answers = {
    id:number;
    correct_options: Options[]
}

interface User {
    name:string;
    avatar: string;
}

type PagerCompProps = {
    data: ForYouData;
    correctOption: string | undefined;
}


type TabButtonsProps = {
    children: string | JSX.Element | JSX.Element[],
    isSelected?: boolean,
    title: string
}

const TabButtons = ({ title, children, isSelected = false }: TabButtonsProps): any => {
    return (
        <View style={{ alignItems: 'center' }}>
            {children}
            <Text style={{ color: isSelected ? 'white' : 'grey', fontSize: 12, marginTop: 5 }}>{title}</Text>
        </View>
    )
}

const BottomTabs = () => {
    return (
        <View style={{ backgroundColor: 'black', flexDirection: 'row', height: 70, width: '100%', position: 'absolute', bottom: 0, justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
            <TabButtons isSelected title={'Home'}>
                <HomeIcon />
            </TabButtons>
            <TabButtons title={'Discover'}>
                <DiscoverIcon />
            </TabButtons>
            <TabButtons title={'Activity'}>
                <ActivityIcon />
            </TabButtons>
            <TabButtons title={'Bookmarks'}>
                <BookmarkIcon fillOpacity={0.4} width={20} height={20} />
            </TabButtons>
            <TabButtons title={'Profile'}>
                <ProfileIcon />
            </TabButtons>
        </View>
    )
}

const TopTabs = () => {
    return (
        <View style={{ backgroundColor: 'transparent', flexDirection: 'row', height: 100, width: '100%', position: 'absolute', top: 0, justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 60, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIcon />
                <Text style={{ color: 'white', fontSize: 12, marginLeft: 5, opacity: 0.7 }} >10 min</Text>
            </View>
            <View style={{paddingRight:40}}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>For You</Text>
                <View style={{ height: 3, width: 40, backgroundColor: 'white', alignSelf: 'center', marginTop: 8 }} />
            </View>

            <SearchIcon />
        </View>
    )
}

const INIT_ENABLED: boolean = false

const ForYouScreen = (props: any) => {

 

    const window = useWindowDimensions();
    const headerHeight = 40;
    const [isCorrect, setIsCorrect] = useState<boolean|null>(null) 
    const [data, setData] = useState<ForYouData[]>([]) 
    const [answers, setAnswers] = useState<Answers[]>([]) 

    
    
    const fetchFoYouData = async () => {
        let response = await fetch('https://cross-platform.rp.devfactory.com/for_you')
        let json:ForYouData = await response.json() 

        let newData = [...data,json]
        setData(newData)
        getAnswer(json.id);
      }
    
      useEffect(() => {
        if(data.length === 0 || data.length < 3){
            fetchFoYouData()
        }
        
      }, [data])

     
     
    const getAnswer = async (id:number) => {

        let response = await fetch(`https://cross-platform.rp.devfactory.com/reveal?id=${id}`)
        let json:Answers = await response.json() 
        let ans = [...answers,json]
        setAnswers(ans)

      }


    

    const PagerComp = React.memo( function PagerComp ({data,correctOption} :  PagerCompProps) {

        const [selectedId, setSelectedId] = useState<string>()
       
        return (
                <ExpoImage   style={{ height: window.height - headerHeight, paddingTop: 130, justifyContent: 'space-between' }} source={{ uri: data.image }}>
                    <Text style={{ color: 'white', fontSize: 20, marginLeft: 20, textAlign: 'left', backgroundColor: 'rgba(0,0,0,0.7)', flexWrap: 'wrap', padding: 10, textAlignVertical: 'auto', width: 'auto', flexShrink: 1 }}>
                        {data.question}
                    </Text>

                    <View style={{ flexDirection: 'column', width: '100%', height: window.height * 0.5, }}>
                        <View style={{ width: '100%', height: window.height * 0.5 - 60, flexDirection: 'row' }}>
                            <View style={{ width: '80%', alignItems: 'center', paddingTop:60 }}>
                                {data.options.map((i:Options,index) => <AnimatedButton key={`${i.id} + ${index}a`} disabled={selectedId ? true : false} onPress={() => {setSelectedId(i.id); console.log(i.id,correctOption)}} isCorrect={selectedId === i?.id ? correctOption === i.id ? true : false : null } text={i.answer} />)}
                                
                                <Text style={{fontWeight:'bold', color:'white',alignSelf:'flex-start',fontSize:14, marginLeft:15,marginTop:16}}>{data.user.name}</Text>
                                <Text numberOfLines={1} style={{ color:'white',alignSelf:'flex-start',fontSize:14, marginLeft:15,marginTop:5}}>{data.description}</Text>

                            </View>
                            
                            <View style={{ width: '20%', alignItems: 'center', paddingVertical: 5, justifyContent: 'space-between' }}>
                                <View style={{ width: 60, height: 60 }}>
                                    <ExpoImage style={{ width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: 'white' }} source={{ uri: data.user.avatar }} />
                                    <View style={{ height: 25, width: 25, borderRadius: 15, backgroundColor: 'green', position: 'absolute', bottom: -12, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                        <PlusIcon width={25} height={25} />
                                    </View>
                                </View>
                                <TabButtons isSelected title={'87'}>
                                    <HeartIcon />
                                </TabButtons>
                                <TabButtons isSelected title={'2'}>
                                    <CommentIcon />
                                </TabButtons>
                                <TabButtons isSelected title={'266'}>
                                    <BookmarkIcon />
                                </TabButtons>
                                <TabButtons isSelected title={'17'}>
                                    <ShareIcon />
                                </TabButtons>
                            </View>
                        </View>
                        <View style={{ height: 60, backgroundColor: 'rgba(0,0,0,0.8)', width: '100%', flexDirection:'row',alignItems:'center',paddingBottom:20,paddingLeft:20, }}>
                            <PlaylistIcon />
                            <Text style={{color:'white',fontSize:14, marginLeft:10,paddingTop:2}}>Playlist • {data.playlist}</Text>
                        </View>
                    </View>

                </ExpoImage>
        )
    });
    

    const getCorrectAnswer = (id:number) => {
        const option =  answers.find(i => i.id === id)?.correct_options[0].id
        return option
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            {data.length > 1 && <PagerView onPageSelected={(e) => {
                if(e.nativeEvent.position === data.length - 2){
                fetchFoYouData()
            }}} initialPage={0}  style={{ height: window.height - headerHeight }} orientation={'vertical'}>
                {data.map((i,index) => <PagerComp key={`${i.id}+${index}`} correctOption={getCorrectAnswer(i.id)} data={i} />)}
            </PagerView>}

            <TopTabs />

            <BottomTabs />
        </View>
    );
};

export default ForYouScreen;