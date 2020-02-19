import { ActionType, getType } from 'typesafe-actions';
import * as actions from '../actions';
import { TaxiResponse } from '../../shared/models/taxi-response';
import covidData from '../../data/covid-sg.json';
import transmissionCluster from '../../data/transmission-cluster.json';
import { FeatureCollection, Feature } from 'geojson';

type Action = ActionType<typeof actions>;

export interface MapState {
  readonly ready: boolean;
  readonly latitude: number;
  readonly longitude: number;
  readonly zoom: number;
  readonly taxiLocations?: TaxiResponse;
  readonly clusterData: FeatureCollection;
  readonly transmissionClusterData: Feature;

}

const initialState: MapState = {
  ready: false,
  latitude: 1.3550417673789497,
  longitude: 103.81799604387754,
  zoom: 9.8,
  clusterData: covidData as FeatureCollection,
  transmissionClusterData: transmissionCluster as Feature
};

export const mapReducer = (
  state: MapState = initialState,
  action: Action
): MapState => {
  switch (action.type) {
    case getType(actions.mapReady):
      return {
        ...state,
        ready: true
      };

    case getType(actions.updateCurrentLocation):
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude
      };

    default:
      return state;
  }
};
