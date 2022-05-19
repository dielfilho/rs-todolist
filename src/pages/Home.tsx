import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';
import { Task } from '../components/TaskItem';

export function Home() {
	const [tasks, setTasks] = useState<Task[]>([]);

	function handleAddTask(newTaskTitle: string) {

		const isADuplicatedTask = tasks.some((_task) => {
			return _task.title.toLowerCase() === newTaskTitle.toLocaleLowerCase()
		});

		if (isADuplicatedTask) {
			Alert.alert("Task Duplicada", "Essa task já está adicionada!");
			return;
		}

		const newTask = {
			id: new Date().getTime(),
			title: newTaskTitle,
			done: false
		};

		setTasks(oldState => {
			return [...oldState, newTask];
		});
	}

	function handleToggleTaskDone(id: number) {
		const updatedTasks = tasks.map(t => {
			if (t.id === id) {
				t.done = !t.done;
			}

			return t;
		});

		setTasks(updatedTasks);
	}

	function handleRemoveTask(id: number) {
		Alert.alert("Remover item", "Tem certeza que você deseja remover esse item?",
			[
				{ text: "Cancelar" },
				{ text: "Remover", onPress: () => { setTasks(tasks.filter(t => t.id !== id)); } }
			]);
	}

	function handleEditTask(id: number, newTitle: string) {
		const updatedTasks = tasks.map(t => {
			if (t.id === id) {
				t.title = newTitle;
			}

			return t;
		});

		setTasks(updatedTasks);
	}

	return (
		<View style={styles.container}>
			<Header tasksCounter={tasks.length} />

			<TodoInput addTask={handleAddTask} />

			<TasksList
				tasks={tasks}
				toggleTaskDone={handleToggleTaskDone}
				removeTask={handleRemoveTask}
				editTask={handleEditTask}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EBEBEB'
	}
})