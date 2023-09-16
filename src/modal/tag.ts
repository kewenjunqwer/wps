export interface Itag {
  create_ts: number;
  modified_ts: number;
  tag_name: string;
  user_id: string;
  tag_id: string;
  color: string;
}

export interface ReqTagCreate {
  color: string;
  tag_name: string;
  _t: number;
}

export interface ReqTagUpdate {
  color: string;
  tag_id: string;
  tag_name: string;
}

export interface ReqTagDel {
  tag_ids: string[];
  _t: number;
}
