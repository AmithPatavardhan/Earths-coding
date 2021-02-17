import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'Search'
})
export class SearchbyNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      args = args.toLowerCase();
      let rVal = ((val.value.authors.toString().toLowerCase().includes(args)) || (val.value.title.toString().toLowerCase().includes(args))
        || (val.value.bookID.toString().toLowerCase().includes(args)) || (val.value.isbn.toString().toLowerCase().includes(args)))
      return rVal

    })

  }


}