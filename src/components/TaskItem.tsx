import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import pencilIcon from '../assets/icons/pencil/pencil.png'

export interface Task {
	id: number;
	title: string;
	done: boolean;
}

export interface TaskItemProps {
	item: Task,
	index: number,
	toggleTaskDone: (id: number) => void;
	removeTask: (id: number) => void;
	editTask: (id: number, newTitle: string) => void;
}

export function TaskItem({ index, item, toggleTaskDone, removeTask, editTask }: TaskItemProps) {

	const [isEditing, setIsEditing] = useState(false);
	const [taskTitle, setTaskTitle] = useState(item.title);
	const textInputRef = useRef<TextInput>(null);

	useEffect(() => {
		if (textInputRef.current) {
			if (isEditing) {
				textInputRef.current.focus();
			} else {
				textInputRef.current.blur();
			}
		}
	}, [isEditing]);

	function handleStartEditing() {
		setTaskTitle(item.title);
		setIsEditing(true);
	}

	function handleCancelEditing() {
		setIsEditing(false);
		setTaskTitle(item.title);
	}

	function handleSubmitEditing() {
		editTask(item.id, taskTitle);
		setIsEditing(false);
	}

	return (
		<>
			<View>
				<TouchableOpacity
					testID={`button-${index}`}
					activeOpacity={0.7}
					style={styles.taskButton}
					onPress={() => { toggleTaskDone(item.id) }}
				>
					<View
						testID={`marker-${index}`}
						style={item.done ? styles.taskMarkerDone : styles.taskMarker}>

						{item.done && (
							<Icon name="check" size={12} color="#FFF" />
						)}

					</View>

					<TextInput
						ref={textInputRef}
						value={taskTitle}
						onChangeText={setTaskTitle}
						editable={isEditing}
						onSubmitEditing={handleSubmitEditing}
						style={item.done ? styles.taskTextDone : styles.taskText}
					>
					</TextInput>

				</TouchableOpacity>
			</View>

			<View style={styles.actionButtons}>
				<TouchableOpacity
					testID={`trash-${index}`}
					style={{ paddingHorizontal: 17 }}
					onPress={() => {
						isEditing ? handleCancelEditing() : handleStartEditing();
					}}
				>
					{isEditing ? <Icon name="x" size={24} color="#b2b2b2" /> : <Image source={pencilIcon} />}
				</TouchableOpacity>

				<View style={styles.iconsDivider}></View>

				<TouchableOpacity
					testID={`trash-${index}`}
					style={{ paddingHorizontal: 17 }}
					onPress={() => { removeTask(item.id) }}
				>
					<Image source={trashIcon} />
				</TouchableOpacity>
			</View>

		</>
	)
}

const styles = StyleSheet.create({
	actionButtons: {
		flexDirection: 'row',
	},
	iconsDivider: {
		width: 1,
		backgroundColor: 'rgba(196, 196, 196, 0.24)'
	},
	taskButton: {
		flex: 1,
		paddingHorizontal: 24,
		paddingVertical: 15,
		marginBottom: 4,
		borderRadius: 4,
		flexDirection: 'row',
		alignItems: 'center'
	},
	taskMarker: {
		height: 16,
		width: 16,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#B2B2B2',
		marginRight: 15,
		alignItems: 'center',
		justifyContent: 'center'
	},
	taskText: {
		color: '#666',
		fontFamily: 'Inter-Medium'
	},
	taskMarkerDone: {
		height: 16,
		width: 16,
		borderRadius: 4,
		backgroundColor: '#1DB863',
		marginRight: 15,
		alignItems: 'center',
		justifyContent: 'center'
	},
	taskTextDone: {
		color: '#1DB863',
		textDecorationLine: 'line-through',
		fontFamily: 'Inter-Medium'
	}
})