import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal:24,
        paddingTop: Constants.statusBarHeight +20,
        backgroundColor:'#283e4a'
    },
    header:{
        marginTop:10,
        flexDirection: 'row',
        //justifyContent: 'space-between',
        alignItems:'center',
    },
    img:{
        height: 45,
        width: 60,
    },
    headerText:{
        marginLeft: 30,
        fontSize:20,
        color: '#0ff'
    },
    title:{
        fontSize: 30,
        marginBottom:16,
        marginTop: 48,
        color: '#13131a',
        fontWeight: 'bold'
    },
    txt:{
        fontSize: 15,
        color: '#ed7a01',
    },
    description:{
fontSize: 16,
lineHeight:24,
color:'#737386'
    },
   
    form:{
        padding: 24,
        flex: 1,
        justifyContent: "center"
        // borderRadius: 8,       
        // marginBottom: 10,
    },
    input:{
    marginTop: 0,
      height: 40,
      backgroundColor:'#fff',
      padding:10,
      borderWidth: 1,
      borderRadius:5
        
    },
    inputDesc:{
        marginTop: 0,
        height: 60,
        backgroundColor:'#fff',
        padding:10,
        borderWidth: 1,
        borderRadius:5
    },
    detailsButton:{
        marginTop:20,
        flexDirection: 'row',
        justifyContent:"center",
        alignItems: "center"
    },
    detailsButtonText:{
        color: '#ed7a01',
        fontSize: 20,
        fontWeight: 'bold',
        padding:5
    },
    spinnerTextStyle: {
        color: '#ed7a01',
      },
     
      modal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "lightgrey",
      },
});