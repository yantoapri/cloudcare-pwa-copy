export interface ResponseApi {
  response: any | undefined
  metaData : {
    message: string | undefined
    code: number | undefined
    response_code : string | undefined
  }
}
