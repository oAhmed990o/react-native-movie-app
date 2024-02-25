import { 
    View, 
    StyleSheet, 
    FlatList, 
    Image, 
    useWindowDimensions, 
    TextInput, 
    ScrollView,
    Text, 
    SafeAreaView,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { searchResults, fetchSearch } from '../../slides';
import { debounce } from "lodash";

export default function SearchScreen() {

    const navigation = useNavigation();
    const [res, setResults] = useState([]);

    const handleItemPress = (item) => {
        navigation.navigate('DS', {movieData: item});
    };

    const handleSearch = (search) => {
        if (search && search.length > 2) {
            fetchSearch(search, res)
            .then((data) => {
                if (data && data["results"]) {
                    setResults(data["results"]);
                    console.log(data["results"]);
                }
            });
        }
      };
    
    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
      <ImageBackground
      source={require('../../assets/images/bg.jpg')}
      style={styles.bg}
      >
        <SafeAreaView style={styles.page}>
          <TextInput 
            onChangeText={handleTextDebounce}  
            style={styles.searchBox}
            placeholder='Search'
            placeholderTextColor={'gray'}
          />

        <FlatList 
            style={styles.slideContainer}
            data={searchResults}
            // key={0}
            numColumns={2}
            renderItem={({item}) => (
                <TouchableOpacity
                    onPress={() => handleItemPress(item)}
                    style={{width: 240, 
                        height: 350, 
                    }}
                >
                    <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.image}
                    />
                </TouchableOpacity>
            )} 
            horizontal={false}
            bounces={false}
            snapToAlignment="center"
        />

        </SafeAreaView>
      </ImageBackground>
  )
}

const styles = StyleSheet.create({
    bg: {
      zIndex: -1,
      flex: 1,
      resizeMode: 'crop',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: { 
        flex: 1,
        borderRadius: 20, 
        margin: 10,
        resizeMode: 'contain',
    },
    searchBox: {
        width: 450,
        padding: 15, 
        borderColor: '#202020', 
        backgroundColor: '#353535',
        color: 'white',
        borderWidth: 2, 
        borderRadius: 20, 
        marginVertical: 50,
        marginHorizontal: 15,
        fontSize: 24,
    },
});