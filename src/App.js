import Child from './Child';
import { useState, useCallback } from 'react';

/*
	props로 전달되는 값이 참조형 자료면 부모에서 해당 props값을 변경하지 않더라도 자식컴포너트는 재랜더링됨
	-- 참조형 자료는 같은 할당하더라도 메모리에 할당되는 값은 해당 값의 참조주소이기 때문에 부모컴포넌트가 재랜더링될때메다 메모리에 매번 다른 참조주소가 할당됨, 그래서 값은 같을 지언정 매번 다른 참조링크가 자식컴포넌트에 전달되므로  memo로 자식 컴포넌트를 메모이제이션 처리했더라도 다른 props값이 들어온걸로 인지해서 재호출 됨
	-- lodash의 isEqau을 memo의 두번째 인수로 전달하면 props로 전달되는 참조링크가 값자체를 비교처리
*/
/*
	useCallback
	자식 컴포넌트에 함수를 props로 전달시, 참조형 자료이므로 ㅏ식 컴포넌트 강제 재호출됨
	이때 useCallback을 이용해서 props로 전달되는 함수자체를 useCallback의 첫번째 인수로 전달, 두번째 인수로 의존성 배열 등록
	- props로 전달되는 인수인 함수자체를 메모이제이션 처리
*/
/* 
	useCallback에 의존성 배열을 등록하는 이유
	- useCallback의 의존성 배열을 비워놓으면 함수에 활용되는 초기 state값 까지 메모이제이션되므로 매번 같은 값만 반환
	- useCallback에 등록된 함수의 내부에 쓰이는 state값을 의존성 배열에 등록하면 해당 state값이 변경될 때만 메모이제이션 해제  
*/

function App() {
	console.log('parent');
	const [Counter, setCounter] = useState(0); //원시형
	const [Input, setInput] = useState('');
	const updateCounter = useCallback(() => setCounter(Counter + 1), [Counter]);

	// 자식 컴포넌트에 영향을 미치치 않는 부모컴포넌트에만 있는 state값이 변경돼서 재랜더링시
	// memo로 감싸져 있는 자식 컴포넌트는 불필요하게 재런더링 되지 않음

	return (
		<div className='app'>
			<h1>Parent : {Counter}</h1>
			<button onClick={() => setCounter(Counter + 1)}>Plus</button>
			<br />
			<input
				type='text'
				value={Input}
				onChange={(e) => setInput(e.target.value)}
			/>

			{/* 자식컴포넌트에 prop으로 전달되는 값이 원시형자료면 재랜더링방지 가능 */}
			{/* 만약, 참조형자료가 전달되면 재랜더링 방지 안됨*/}
			<Child Counter={Counter} updateCounter={updateCounter} />
			{/*  참조형 배열인 arr을 참조하면 child까지 재랜더링이 일어남 */}
		</div>
	);
}

export default App;
