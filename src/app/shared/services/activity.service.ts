import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class ActivityService {
  constructor(private http: HttpService) { }

  list(word?: string, age?: string, interestId?: string, cityId?: string,
       sobriety?: any, free?: any) {
    let search = new URLSearchParams();

    word ? search.append('word', word) : search.delete('word');
    age ? search.append('age', age) : search.delete('age');
    search.append('interestId', interestId);
    search.append('cityId', cityId);
    sobriety ? search.append('sobriety', sobriety) : search.delete('sobriety');
    free ? search.append('free', free) : search.delete('free');

    return this.http.get('activity/search', new RequestOptions({ search }));
  }
  listUnchecked(word?: string, age?: string, interestId?: string, cityId?: string,
                sobriety?: any, free?: any) {
    let search = new URLSearchParams();

    word ? search.append('word', word) : search.delete('word');
    age ? search.append('age', age) : search.delete('age');
    search.append('interestId', interestId);
    search.append('cityId', cityId);
    sobriety ? search.append('sobriety', sobriety) : search.delete('sobriety');
    free ? search.append('free', free) : search.delete('free');

    return this.http.get('activity/searchunchecked', new RequestOptions({ search }));
  }
  take(id) {
    return this.http.get(`activity/${id}`);
  }
  create(body) {
    return this.http.post(`activity`, body);
  }
  update(body, id) {
    return this.http.put(`activity/${id}`, body);
  }
  setCheck(isChecked, id) {
    return this.http.put(`activity/setchecked?activityId=${id}&isChecked=${isChecked}`);
  }
  remove(id) {
    return this.http.delete(`activity/${id}`);
  }
  createTempFile(body) {
    return this.http.post('tempfile', body);
  }
  removeTempFile(id) {
    return this.http.delete(`tempfile/${id}`);
  }
  removePicture(id) {
    return this.http.delete(`picture/${id}`);
  }
}
