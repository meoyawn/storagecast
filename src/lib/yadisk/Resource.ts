export interface DiskDir {
  type: "dir"
  public_url: string
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

export interface DiskFile {
  type: "file"
  public_key: string
  comment_ids: CommentIDS
  name: string
  created: string
  size: number
  resource_id: string
  modified: string
  mime_type: string
  file: string
  path: string
  media_type: "audio" | "image"
  sha256: string
  md5: string
  revision: number
  preview?: string
}

export interface DiskResource extends DiskDir {
  _embedded: Embedded
}

export type DiskItem = DiskDir | DiskFile

interface Embedded {
  sort: string
  public_key: string
  items: ReadonlyArray<DiskItem>
  limit: number
  offset: number
  path: string
  total: number
}

interface CommentIDS {
  private_resource: string
  public_resource: string
}
