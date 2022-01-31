## HOOKS

1. UseRef Hook

    - When we update the ref in app state is doesn't trigger the re-render of components
    - Also it ref value is persisted over multiple renders. It does not get changed.
    - Following example shows to count number of times a component rendered.
    - UseRef also allows to get hold of DOM elements

``` javascript

    import React from 'react';
    import { useState,useRef } from 'react';

    const test = () => {
        const [randomInput, setRandomInput] = useState('');
        const renderCount = useRef(0);
        const inputRef = useRef();

        function handleChange(e){
            setRandomInput(e.target.value);
            renderCount.current++;
        }

        //When button is clicked, input get focused on.
        function focusOnInput(){
            inputRef.current.focus();
        }

        return <div>
            <input
                ref={inputRef}
                type="text"
                value={randomInput}
                placeholder='Random Input'
                onChange={handleChange}
            />
            <p>"Render Count - " { renderCount.current }</p>
            <button onClick={focusOnInput}></button>

        </div>;
    };

    export default test;
```

2. useCallback 

    - useCallback hook doesn't make a new copy of function everytime a component is re-rendered.

```javascript
    function MyComponent(){
        const handleClick(){
            console.log("Clicked!");
        };
        .....
    }
```
    - In the above code handleClick is generated new everytime component is re-rendered.

```javascript
    const memoizedCallback = useCallback(() => {
        return num1 + num2
    },[num1,num2])
```
    - Here in the above function the memoized callback runs only when items present in dependency array changes. In this case it is "num1" and "num2".