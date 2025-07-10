import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TagInterface } from '../types/tag.interface';
import { HttpErrorResponse } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  afterEach(()=>{
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTags', ()=>{
    it('should get all tags', ()=>{
      let tags:TagInterface[]|undefined
      service.getTags().subscribe(data=>{
        tags = data
      })
      const req = httpTestingController.expectOne('/tags')
      req.flush([{id:'1', name: 'Foo'}])
      expect(tags).toEqual([{id:'1', name: 'Foo'}])
    })
  })

  describe('createTag', ()=>{
    it('should create a tag', ()=>{
      let tag: TagInterface | undefined
      service.createTag('foo').subscribe(data=>{
        tag = data
      })
      const req = httpTestingController.expectOne('/tags')
      req.flush([{id: '1', name: 'foo'}])
      expect(tag).toEqual([{id: '1', name: 'foo'}])
    })

    it('passes a correct body', ()=>{
      let tag: TagInterface | undefined
      service.createTag('foo').subscribe(data=>{
        tag = data
      })
      const req = httpTestingController.expectOne('/tags')
      req.flush([{id: '1', name: 'foo'}])
      expect(req.request.method).toEqual('POST')
      expect(req.request.body).toEqual({name:'foo'})
    })

    it('throws an error if request fails', ()=>{
      let actualError: HttpErrorResponse | undefined
      service.createTag('foo').subscribe({
        next: ()=>{
          fail('Success should not be called')
        },
        error: (err)=>{
          actualError = err
        }
      })
      const req = httpTestingController.expectOne('/tags')
      req.flush('server error', {
        status: 422,
        statusText: 'not available'
      })

      if(!actualError)
        throw new Error('Error needs to be defined')

      expect(actualError.status).toEqual(422)
      expect(actualError.statusText).toEqual("not available")
    })
  })
});
