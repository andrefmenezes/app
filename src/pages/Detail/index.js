import React from 'react'
import {View,TouchableOpacity,Image,Text,Linking} from 'react-native'
import {Feather} from '@expo/vector-icons'
import {useNavigation,useRoute} from '@react-navigation/native'
import * as MailCompose from 'expo-mail-composer'
import logoImg from '../../assets/logo.png'
import styles from './styles'
export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute()
    const incident = route.params.incident
  const msg = "olá André, estou entrando em contato..."
    function navigateBack(){
        navigation.goBack()
    }
    function sendEmail(){
        MailCompose.composeAsync({
            subject: `${incident.title}`,
            recipients: ["afmdtb@poli.br"],
            body: msg,
            
        })
    }
    function sendWhats(){
Linking.openURL(`whatsapp://send?phone=558183581075?text=asfsdafd`)
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} style={styles.img} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name='arrow-left' size={20} color="green" />
                </TouchableOpacity>
            </View>
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
            </View>
            <View  style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia</Text>
                <Text style={styles.heroTitle}>Seja o heroi desse caso</Text>
                  
                <Text style={styles.heroDescription}>Entre em contato</Text> 

                <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={sendWhats}>
          <Text style={styles.actionText}>Whatsapp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={sendEmail}>
          <Text style={styles.actionText}>Email</Text>
        </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}