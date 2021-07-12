import React from 'react';
// import { Text, View, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';
// import {
//     Avatar,
//     Title,
//     Caption,
//     Paragraph
// } from 'react-native-paper';
// import LogoutButton from '../../../components/LogoutButton/index';
// import authAPI from '../../../apis/auth.api';
// import { useDispatch, useSelector } from 'react-redux';
// import Feather from 'react-native-vector-icons/Feather';
// import { changeLoadingState, saveAccessToken, saveSignedInUser } from '../../../redux/actions/auth';
import { createStackNavigator } from '@react-navigation/stack';

import SettingScreen from "./SettingScreen";
import ProfileScreen from "./ProfileScreen";
import ChangePasswordScreen from './ChangePasswordScreen';
import ChangeInterestTopicScreen from './ChangeInterestTopicScreen';
import AchievementScreen from './AchievementScreen';

// function SettingsScreen({ navigation }) {
//     const { currentUser } = useSelector(state => state.authReducer);
//     const dispatch = useDispatch()
//     const { accessToken } = useSelector(state => state.authReducer);
//     // const { currentUser } = useSelector(state => state.authReducer);

//     const handleLogoutClick = async () => {
//         authAPI.logout(accessToken).then(res => {
//             dispatch(saveAccessToken({
//                 accessToken: null,
//                 refreshToken: null,
//                 expirationTime: null,
//                 currentUser: null
//             }));
//             setTimeout(() => {
//                 dispatch(changeLoadingState(false))
//                 navigation.navigate("SignIn");
//             }, 1000);
//         }).catch(err => {
//             dispatch(saveAccessToken({
//                 accessToken: null,
//                 refreshToken: null,
//                 expirationTime: null,
//                 currentUser: null
//             }));
//             setTimeout(() => {
//                 dispatch(changeLoadingState(false))
//                 navigation.navigate("SignIn");
//             }, 1000);
//         })
//     }

//     console.log(currentUser);

//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <View style={styles.account_i}>
//                     <View style={{ flexDirection: 'row', marginTop: 15 }}>
//                         <Avatar.Image
//                             source={{
//                                 uri: 'https://cdn.iconscout.com/icon/free/png-256/account-avatar-profile-human-man-user-30448.png'
//                             }}
//                             size={60}
//                             style={styles.imageStyle}
//                         />
//                         <View style={{ marginLeft: 15, flexDirection: 'column' }}>
//                             <Title style={styles.title}>{currentUser.fullName}</Title>
//                             <Caption style={styles.caption}>{currentUser.email}</Caption>
//                         </View>
//                     </View>

//                     <View style={styles.row}>
//                         <View style={styles.section}>
//                             <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
//                             <Caption style={styles.caption}>Questions</Caption>
//                         </View>
//                         <View style={styles.section}>
//                             <Paragraph style={[styles.paragraph, styles.caption]}>1000</Paragraph>
//                             <Caption style={styles.caption}>Point</Caption>
//                         </View>
//                     </View>
//                 </View>
//                 {/* <View style={styles.gr_button}>
//                     <Button style={styles.button_css} title="Update Info" />
//                     <Button title="Change Password" />
//                     <Button title="Change Interest Topic" />
//                     <Button title="Achievement" />
//                 </View> */}
//                 <TouchableOpacity
//                     style={styles.button_css}
//                     onPress={() => navigation.navigate('SignUpScreen')}
//                 >
//                     <Feather
//                         name="user-check"
//                         color='#fff'
//                         size={25}
//                     />
//                     <Text style={styles.button_text}>Update Profile</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     style={styles.button_css}
//                 >
//                     <Feather
//                         name="shield"
//                         color='#fff'
//                         size={25}
//                     />
//                     <Text style={styles.button_text}>Change Password</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     style={styles.button_css}
//                 >
//                     <Feather
//                         name="bookmark"
//                         color='#fff'
//                         size={25}
//                     />
//                     <Text style={styles.button_text}>Change Interest Topic</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     style={styles.button_css}
//                 >
//                     <Feather
//                         name="award"
//                         color='#fff'
//                         size={25}
//                     />
//                     <Text style={styles.button_text}>Achievement</Text>
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.footer}>
//                 <LogoutButton style={styles.button} handleLogoutClick={handleLogoutClick} />
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         backgroundColor: '#009387',
//         width: '100%'
//     },
//     header: {
//         flex: 9,
//         // justifyContent: 'center',
//         // paddingHorizontal: 20,
//         // paddingBottom: 0,
//         // backgroundColor: "green",
//         paddingTop: 30,
//         alignItems: 'center',
//         justifyContent: 'flex-start'
//     },
//     footer: {
//         flex: 1,
//         backgroundColor: '#fff',
//         borderTopLeftRadius: 30,
//         borderTopRightRadius: 30,
//         paddingHorizontal: 20,
//         paddingVertical: 30,
//         // backgroundColor: "blue"
//     },
//     text_header: {
//         color: '#fff',
//         fontWeight: 'bold',
//         fontSize: 30,
//     },
//     text_footer: {
//         color: '#05375a',
//         fontSize: 18
//     },
//     action: {
//         flexDirection: 'row',
//         marginTop: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#f2f2f2',
//         paddingBottom: 5
//     },
//     button_css: {
//         alignItems: 'left',
//         borderColor: '#fff',
//         borderWidth: 1,
//         marginTop: 15,
//         width: '100%',
//         height: 70,
//         justifyContent: 'center',
//         borderRadius: 10,
//         paddingLeft: 10,
//     },
//     title: {
//         fontSize: 20,
//         marginTop: 3,
//         fontWeight: 'bold',
//         color: '#fff'
//     },
//     caption: {
//         fontSize: 14,
//         lineHeight: 14,
//         color: '#fff'
//     },
//     row: {
//         marginTop: 20,
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     section: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginRight: 15,
//     },
//     paragraph: {
//         fontWeight: 'bold',
//         marginRight: 3,
//     },
//     signIn: {
//         width: '100%',
//         height: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 10
//     },
//     textSign: {
//         fontSize: 18,
//         fontWeight: 'bold'
//     },
//     account_i: {
//         justifyContent: 'flex-start',
//         paddingBottom: 30,
//         paddingTop: 20
//     },
//     button_text: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#fff',
//         // textAlign: 'center'
//         marginLeft: 30,
//         //, marginBottom: 10
//     },
//     imageStyle: {
//         backgroundColor: '#fff',
//     }
// });

// export default SettingsScreen;
function SettingsScreen({ navigation }) {
    const SettingScreenStack = createStackNavigator();
    return (
        <SettingScreenStack.Navigator screenOptions={{ headerShown: true }} initialRouteName="HomeSettingScreen">
            <SettingScreenStack.Screen options={{ headerShown: false }} name="HomeSettingScreen" component={SettingScreen} />
            <SettingScreenStack.Screen name="ProfileScreen" component={ProfileScreen} />
            <SettingScreenStack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
            <SettingScreenStack.Screen name="ChangeInterestTopicScreen" component={ChangeInterestTopicScreen} />
            <SettingScreenStack.Screen name="AchievementScreen" component={AchievementScreen} />
        </SettingScreenStack.Navigator>
    );
}

export default SettingsScreen;