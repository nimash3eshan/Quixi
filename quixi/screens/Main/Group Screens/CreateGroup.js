import * as React from 'react';
import {Text, View, StyleSheet, SafeAreaView, Alert, TextInput, TouchableHighlight} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {StatusBar} from "expo-status-bar";
import {COLORS} from "../../../assets/constants/colors";
import {useEffect, useState} from "react";
import Axios from "axios"
import {GROUP_ROUTES} from "../../../assets/constants/routes";
import * as SecureStore from "expo-secure-store";


export default function CreateGroup({navigation}) {
    const [selectValue, setSelectValue] = useState('');
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');

    let [userId, setUserId] = useState("");
    let [token, setToken] = useState("");
    let [user, setUser] = useState({});
  

    const handlePickerChange = (value) => {
        setSelectValue(value);
    }

    useEffect(() => {
        async function fetchData() {
          await getUserId();
          await getToken();
        }
        fetchData();
      }, []);

      const getUserId = async () => {
        const userId = await SecureStore.getItemAsync("userId");
        setUserId(userId);
      };
      const getToken = async () => {
        const token = await SecureStore.getItemAsync("token");
        setToken(token);
      };


      function create_Group(){
        console.log(selectValue, groupName, groupDescription)
        if(!groupName || !groupDescription || !selectValue){
            Alert.alert("Failed", "Please fill all fields")
        }else{
            let url = GROUP_ROUTES.CREATE;

            const groupData = {
                'category': selectValue,
                'name': groupName,
                'description': groupDescription,
                'members': [userId]
              };

            const config ={
                method: 'post',
                url: url,
                headers:{
                    authorization: "Bearer " + token.replaceAll('"',''),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: groupData
            }

            Axios(config)
            .then((response)=>{
                console.log(response.data);
                Alert.alert("Success", "Group Created Successfully")
            }).catch((error)=>{
                console.log(error);
                Alert.alert("failed", error)
            })
            setGroupName("");
            setGroupDescription("");
            setSelectValue("");
    
            
        }
        
      }
    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light"/>
            <View style={styles.bottomSheet}>

              <View style={styles.groupDetails}>
                <Text style={styles.groupDetailsText} >Group Name</Text>
                <TextInput style={styles.input} onChangeText={(text) => setGroupName(text)} value={groupName}/>
                <Text style={styles.groupDetailsText} >Group Description</Text>
                <TextInput style={styles.input} onChangeText={(text) => setGroupDescription(text)} value={groupDescription}/>
            </View>
          
            <View style={styles.labelContainer}>
            
              <Picker selectedValue={selectValue} onValueChange={(item)=>handlePickerChange(item)} >
                <Picker.Item label="Select a type" value="" enabled={false}  />
                <Picker.Item label="Home" value="Home" />
                <Picker.Item label="Trip" value="Trip" />
                <Picker.Item label="Couple" value="Couple" />
                <Picker.Item label="Other" value="Other" /> 
              </Picker>

              </View>  

              <TouchableHighlight
                  style={{
                    backgroundColor: '#010b40',
                    borderRadius: 10,
                    padding: 10,
                    alignItems: 'center',
                    width: 100,
                    height: 40,
                    marginTop:40,
                    marginLeft:120
                  }}
                  
                  onPress={create_Group}

              >
                  <Text style={{ color: 'white' }}>Create</Text>
              </TouchableHighlight>
        
            </View> 
        </SafeAreaView>
      );
};

const styles = StyleSheet.create({
  
      bottomSheet: {
        height: '100%', //change this after design it
        backgroundColor: COLORS.BG, 
        width: '100%', 
        borderTopEndRadius: 50, 
        borderTopStartRadius: 50, 
        marginTop: 100
      }, 
    
      container: {
        paddingTop: 10, 
        backgroundColor: COLORS.PRIMARY,
      },

      input: {
        height: 40,
        margin: 20,
        borderBottomWidth:1,
        width:200,
        padding: 10,
      },
    
      groupDetails:{
        marginTop:20,
        alignSelf:'center',
      },
    
      groupDetailsText:{
        marginTop:40
      },
    
      labelContainer: {
        paddingVertical: 2,
        paddingHorizontal: 10,
        marginTop:40,
        marginHorizontal:75,
      },
  
});