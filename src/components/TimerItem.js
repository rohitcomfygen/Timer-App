// src/components/TimerItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProgressBar from './ProgressBar';
import { formatTime } from '../utils/helpers';

const TimerItem = ({ timer, onTimerAction }) => {
  const progress = timer.duration > 0 ? (timer.duration - timer.remainingTime) / timer.duration : 0;

  let statusColor;
  switch (timer.status) {
    case 'running':
      statusColor = '#28a745';
      break;
    case 'paused':
      statusColor = '#ffc107';
      break;
    case 'completed':
      statusColor = '#dc3545';
      break;
    default:
      statusColor = '#6c757d';
  }

  return (
    <View style={styles.timerItem}>
      <View style={styles.timerInfo}>
        <Text style={styles.timerName} numberOfLines={1} ellipsizeMode="tail">{timer.name}</Text>
        <Text style={styles.timerTime}>{formatTime(timer.remainingTime)}</Text>
        <Text style={[styles.timerStatus, { color: statusColor }]}>
          {timer.status.toUpperCase()}
        </Text>
      </View>

      <ProgressBar progress={progress} />

      <View style={styles.timerControls}>
        {timer.status !== 'running' && timer.remainingTime > 0 && (
          <TouchableOpacity
            style={[styles.controlButton, styles.startButton]}
            onPress={() => onTimerAction(timer.id, 'start')}
          >
            <Text style={styles.controlButtonText}>Start</Text>
          </TouchableOpacity>
        )}
        {timer.status === 'running' && (
          <TouchableOpacity
            style={[styles.controlButton, styles.pauseButton]}
            onPress={() => onTimerAction(timer.id, 'pause')}
          >
            <Text style={styles.controlButtonText}>Pause</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.controlButton, styles.resetButton]}
          onPress={() => onTimerAction(timer.id, 'reset')}
        >
          <Text style={styles.controlButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timerItem: {
    backgroundColor: '#fefefe',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1.00,
  },
  timerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timerName: {
    fontSize: 17,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
    color: '#343a40',
  },
  timerTime: {
    fontSize: 17,
    fontWeight: 'bold',
    minWidth: 65,
    textAlign: 'right',
    color: '#495057',
  },
  timerStatus: {
    fontSize: 12,
    marginLeft: 10,
    fontWeight: '600',
    minWidth: 65,
    textAlign: 'right',
  },
  timerControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  controlButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#28a745',
  },
  pauseButton: {
    backgroundColor: '#ffc107',
  },
  resetButton: {
    backgroundColor: '#6c757d',
  },
  controlButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default TimerItem;