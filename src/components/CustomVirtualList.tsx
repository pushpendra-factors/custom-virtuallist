import React, { LegacyRef, MutableRefObject, useEffect, useRef, useState } from "react";

export interface CustomVirtualListPropsType {
    children: JSX.Element;
    items: Array<any>;
    renderItem: Function;
    listProps: Object;
}
function CustomVirtualList({
    children,
    items,
    renderItem,
    listProps
} : CustomVirtualListPropsType){

    const listRef = useRef<HTMLDivElement | null>(null);
    const [viewportDimensions, setViewportDimensions] = useState<{width: number, height: number}>({width: 0, height: 0})
    const [totalLists, setTotalLists] = useState<Array<any>>([]);
    const [viewportLists, setViewportLists] = useState<Array<any>>([]);
    const [noOfItems, setNoOfItems] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    

    useEffect(()=>{
        setTotalLists(items);
    },[items])
    useEffect(()=>{
        
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        console.log(listRef)
        const parentElement = listRef.current;
        // get viewport dimensions
        let viewportDimensions = {
            height: vh,
            width: vw
        }

        setViewportDimensions(viewportDimensions);
        let childElement = parentElement?.childNodes && parentElement?.childNodes[0]
        let itemDimensions = {
            height: childElement?.offsetHeight,
            width: childElement?.offsetWidth

        }
        // We'll be having this much no. of nodes rendered
        let noOfItems = Math.ceil(vh / itemDimensions.height)  + 10;
        setStartIndex(3);
        setNoOfItems(noOfItems);
        console.log(noOfItems)
        
    },[])
    
    return <div 
        {...listProps} 
        style={{overflow: "scroll", height: viewportDimensions.height }} 
        ref={(ref) => { listRef.current = ref; }} 
        onScroll={(e)=>{
            console.log(e)
        }}
        >
        {items.slice(startIndex, noOfItems+startIndex-1).map((eachItem, eachIndex)=>{
            return renderItem(eachItem, eachIndex);
        })}
    </div>
}
export default CustomVirtualList;