import React,{useEffect,useState} from 'react'
import {View,Image,Text,TouchableOpacity,FlatList} from 'react-native'
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import api from '../../services/api'
import logoImg from '../../assets/logo.png'
import styles from './style'
export default function Incidents(){
    const [incidents,setIncidents] = useState([])
    const [total,setTotal]= useState(0)
    const [page,setPage]= useState(1);
    const [loading,setLoading]= useState(false)
    const navigation = useNavigation();

    function navigateToDetail(incident){
        navigation.navigate('Detail',{incident})
    }
    async function loadIncident(){
        if(loading){
            return
        }
        if(total > 0 && incidents.length == total){
            return
        }
            setLoading(true)
        
   const response = await api.get('incidents',{
       params:{page}
   });
   setIncidents([...incidents, ...response.data])
   setTotal(response.headers['x-total-count'])
   setPage(page +1)
   setLoading(false)
    }
    useEffect(()=>{
    loadIncident()
    },[])
    return( 
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} style={styles.img} />
                <Text style={styles.headerText}>
                {total}
                </Text>
            </View>
            <Text style={styles.title}>
                Bem-vindo!
            </Text>
            <Text style={styles.description}>
            aqui tem uma descrição
            </Text>
            <FlatList 
             style={styles.incidentList}
            data={[incidents]}
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator={false}
            onEndReached={loadIncident()}
            renderItem={({ item: incident} )=>(
                <View style={styles.incident}>
                <Text style={styles.incidentProprty}>
                 ONG:
                </Text>
                <Text style={styles.incidentValue}>
                {incident.name}
                </Text>
                <Text style={styles.incidentProprty}>
                 CASO:
                </Text>
                <Text style={styles.incidentValue}>
                {incident.title}
                </Text>
                <Text style={styles.incidentProprty}>
                 Valor:
                </Text>
                <Text style={styles.incidentValue}>
                {Intl.NumberFormat('pt-BR',{style:'currency',
                currency: 'BRL'})
                .format(incident.value)}
                </Text>
                <TouchableOpacity style={styles.detailsButton}
                onPress={navigateToDetail}
                  >
                     <Text style={styles.detailsButtonText}>
                         Ver mais detalhes
                     </Text>
                     <Feather name='arrow-right' size={16} color="green" />
                </TouchableOpacity>
            </View>
            )}
            />
            
            </View>
    )
}