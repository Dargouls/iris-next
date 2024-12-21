import { animated, useTransition } from '@react-spring/web';
import { useState } from 'react';

const AnimatedList = () => {
	const [items, setItems] = useState<string[]>([]);

	const transitions = useTransition(items, {
		from: { opacity: 0, transform: 'translateY(-20px)' },
		enter: { opacity: 1, transform: 'translateY(0px)' },
		leave: { opacity: 0, transform: 'translateY(-20px)' },
		keys: items.map((_, index) => index), // Unique key for each item
	});

	const addItem = () => {
		const newItem = `Item ${items.length + 1}`;
		setItems((prevItems) => [...prevItems, newItem]);
	};

	const removeItem = (indexToRemove: number) => {
		setItems((prevItems) => prevItems.filter((_, index) => index !== indexToRemove));
	};

	return (
		<div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
			<button onClick={addItem} style={{ marginBottom: '20px' }}>
				Add Item
			</button>
			<div>
				{transitions((style, item, _, index) => (
					<animated.div
						key={item}
						style={{
							...style,
							marginBottom: '10px',
							padding: '10px',
							backgroundColor: '#f0f0f0',
							borderRadius: '4px',
						}}
						onClick={() => removeItem(index)}
					>
						{item}
					</animated.div>
				))}
			</div>
		</div>
	);
};

export default AnimatedList;
