import React, { useEffect, useState } from 'react'
import { View, Image, Text, TouchableOpacity, FlatList, TextInput, Modal, Platform, KeyboardAvoidingView,Button } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'
import logoImg from '../../assets/logo.png'
import styles from './style'
import Spinner from 'react-native-loading-spinner-overlay';
import Scanner from "../../components/Scanner";
export default function Incidents() {

    const [qtd, setQtd] = useState('1')
    const [codigo, setCodigo] = useState("")
    const [desc, setDesc] = useState("");
    const [verificar, setVerificar] = useState(false)
    const [id, setId] = useState('')
    const [ds, setDs] = useState("x")
    const [dt, setDt] = useState([])
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);

    const [type, setType] = React.useState("");
    const [data, setData] = React.useState("");

    const onCodeScanned = (type, data) => {
        setType(type);
        setData(data);
        setModalVisible(false);
    };

    const send = async (isUpdate) => {
        setLoading(true);
        if (isUpdate) {
            console.log('ATUALIZAR', {
                ID: id,
                codigo: codigo,
                qtd: Number(qtd),
                desc: desc
            })
            const response = await api.put('produto/' + id, {
                codigo: codigo,
                qtd: Number(qtd),
                desc: desc
            });
            setQtd('1');
            setId('')
            listar()
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        } else {
            // console.log('POST',{
            //     codigo: codigo,
            //     qtd: qtd,
            //     desc: desc
            // })

            const res = await api.post('produto', {
                codigo: codigo,
                qtd: Number(qtd),
                desc: desc
            });
            setQtd('1');
            setId('')
            listar()
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }


    };

    const verificando = () => {
        var flag = false;
        dt.map((item, index) => {
            if (codigo.length == 13 && codigo == item.codigo) {
                var tst = item.id
                setId(tst)
                console.log('ID_ITEM ', tst)
                console.log('ID ', id)
                flag = true;
            }
        })

        return flag
    };
    const startLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };
    async function listar() {
        //console.log('LISTAR')

        const res = await api.get('produto');
        var array = new Array()
        res.data.map(i => {
            array.push(i)
        })
        setDt(array)
        // console.log(dt)
    }

    useEffect(() => {//watch
        listar()
    }, [])
    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.header}>
                <Image source={logoImg} style={styles.img} />
                <Text style={styles.headerText}>
                    Cadastro de produtos
                </Text>
            </View>



            <View style={styles.form}>
                <Text style={styles.txt}>
                    Quantidade
                </Text>
                <TextInput style={styles.input}
                    //placeholder = "Quantidade"
                    placeholderTextColor="#ed7a01"
                    defaultValue={qtd}
                    onChangeText={qtd => setQtd(qtd)}
                    keyboardType="numeric"
                />
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modal}>
                        <Scanner onCodeScanned={onCodeScanned} />
                        <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                    </View>
                </Modal>
                <Button title="Escanear" onPress={() => setModalVisible(true)} />
                <Text style={styles.txt}>
                    Código
                </Text>
                <TextInput style={styles.input}
                    // placeholder = "Código"
                    placeholderTextColor="#ed7a01"
                    value = {data}                     
                    onChangeText={codigo => setCodigo(codigo)}
                />
                <Text style={styles.txt}>
                    Descrição
                </Text>
                <TextInput style={styles.inputDesc}
                    //placeholder = "Descrição"
                    placeholderTextColor="#ed7a01"
                    onChangeText={desc => setDesc(desc)}
                />

                <Spinner
                    //visibility of Overlay Loading Spinner
                    visible={loading}
                    //Text with the Spinner
                    textContent={'Cadastrando...'}
                    //Text style of the Spinner Text
                    textStyle={styles.spinnerTextStyle}
                />


                <TouchableOpacity style={styles.detailsButton}
                    onPress={() => {
                        if (verificando()) {
                            send(true)
                        } else {
                            send(false)
                        }

                    }}
                >
                    <Text style={styles.detailsButtonText}>
                        Sincronizar
                     </Text>
                    <Feather name='download-cloud' size={17} color="#ed7a01" />
                </TouchableOpacity>
                
            </View>



        </KeyboardAvoidingView>
    )
}