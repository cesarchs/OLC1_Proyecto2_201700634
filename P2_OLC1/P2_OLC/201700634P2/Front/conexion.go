package main

import (
	"fmt"
	"html/template"
	"net/http"
)

func index(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, "")
}
func main() {
	http.Handle("/layout/", http.StripPrefix("/layout/", http.FileServer(http.Dir("layout"))))
	http.HandleFunc("/", index)
	fmt.Println("puerto 3000")
	http.ListenAndServe(":3000", nil)
}
