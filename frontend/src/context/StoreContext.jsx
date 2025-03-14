import { createContext, useEffect, useState } from "react";
import axios from "axios"
// import { food_list } from "../as  /assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    // console.log("Backend URL:", import.meta.env.VITE_REACT_APP_BACKEND_BASEURL);

    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`;
    // const url = "http://localhost:4000";

    const [token,setToken] = useState("");
    const [food_list, setFoodList] = useState([])


    const addToCart = (itemId) => {
        console.log(itemId);
        if (!cartItems[itemId]) {
            setCartItems((prev) => ( 
                { ...prev, [itemId]: 1 }
            ))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;         // we used forin loop here becaue cartItem is an object
        for (const item in cartItems) {

            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];

            }
        }
        return totalAmount;
    }

    const fetchFoodList = async()=>{
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
    }

    useEffect(()=>{
// if (localStorage.getItem("token")) {
//     setToken(localStorage.getItem("token"));
// }  //                                    copied inside loadData
async function loadData(){
    await fetchFoodList();
    if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
    }
}
loadData();
    },[])

    //  this was written to check items stored in cart and their quantity to chack in console
    useEffect(() => {
        console.log(cartItems);

    }, [cartItems])

    const contextValue = {
        food_list,  //now food_list can be accesed anywhere due to context state
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;