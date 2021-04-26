export interface Resource {
  public_key: string
  public_url: string
  _embedded: Embedded
  name: string
  resource_id: string
  revision: number
  created: string
  modified: string
  owner: Owner
  path: string
  comment_ids: CommentIDS
  type: "file" | "dir"
  views_count: number
}

export type Item = Dir | File

interface Embedded {
  sort: string
  public_key: string
  items: ReadonlyArray<Item>
  limit: number
  offset: number
  path: string
  total: number
}

export interface File {
  type: "file"
  antivirus_status: "clean"
  public_key: string
  comment_ids: CommentIDS
  name: string
  created: string
  size: number
  resource_id: string
  modified: string
  mime_type: "audio/mpeg" | "image/jpeg"
  file: string
  path: string
  media_type: "audio" | "image"
  sha256: string
  md5: string
  revision: number
  preview?: string
}

export interface Dir {
  type: "dir"
  antivirus_status: "clean"
  public_key: string
  comment_ids: CommentIDS
  name: string
  created: string
  resource_id: string
  modified: string
  path: string
  revision: number
  views_count: number
}

interface CommentIDS {
  private_resource: string
  public_resource: string
}

interface Owner {
  login: string
  display_name: string
  uid: string
}
