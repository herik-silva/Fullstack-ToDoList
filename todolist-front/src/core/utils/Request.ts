class Request<T> {
  getAPI(url: string, options?: RequestInit) {
    return fetch(url, options).then((response) => response.json());
  }

  postAPI(url: string, body: BodyInit, options?: RequestInit) {
    const config: RequestInit = options
      ? options
      : {
          method: "POST",
          body: body,
          headers: { "Content-Type": "application/json" },
        };

    return fetch(url, config).then((value) => value.json());
  }

  deleteAPI(url: string, options?: RequestInit) {
    const config: RequestInit = options
      ? options
      : {
          method: "DELETE",
        };

    return fetch(url, config).then((value) => value.json());
  }

  putAPI(url: string, body: BodyInit, options?: RequestInit) {
    const config: RequestInit = options
      ? options
      : {
          method: "PUT",
          body: body,
          headers: { "Content-Type": "application/json" },
        };

    return fetch(url, config);
  }
}

export default Request;
