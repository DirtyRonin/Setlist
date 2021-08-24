import { FragmentType } from './FragmentType';

export class QueryFragment {
  constructor(public type: FragmentType, public value: string) {}
}