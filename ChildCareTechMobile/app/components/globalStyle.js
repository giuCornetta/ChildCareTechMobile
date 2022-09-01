import {StatusBar, StyleSheet} from "react-native";

const globalStyle = StyleSheet.create({

    row: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row'
    },
    cell: {
        flex: 1,
        alignSelf: 'stretch',
        borderBottomColor: "black",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderLeftColor : "black",
        borderLeftWidth : StyleSheet.hairlineWidth,
        borderRightColor: "black",
        borderRightWidth: StyleSheet.hairlineWidth,

    },
    insideCell: {
        margin: 10,
        paddingVertical: 10,
    },
    header: {
        backgroundColor :  '#E0FFFF',
        borderTopColor: "black",
        borderTopWidth: StyleSheet.hairlineWidth
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        textAlign: 'center',
        padding: 20, //20
        marginVertical: 8, //8
        marginHorizontal: 16, //16
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollContainer: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 32
    },
    subTitle: {
        fontSize : 25,
        margin : 5
    },
    table: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    button: {
        backgroundColor: "#DDDDDD",
        padding: 10,
    },
    tableButton: {
        textDecorationLine: 'underline',
    },
    /*rightSideButton: {
        alignSelf: 'flex-end',
        marginTop: -5,
        position: 'above',
    },*/
    centerButton: {
        alignSelf: 'center',
    },
    reminder: {
        color: 'red',
    },
    reminderButton: {
        backgroundColor: '#f5938c',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxHeight: 500,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
});

export { globalStyle };