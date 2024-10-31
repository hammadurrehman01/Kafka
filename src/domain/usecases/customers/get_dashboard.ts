import { CARD_TYPES } from '@data/enums/card_types';
import { HttpResponse } from '@data/res/http_response';
// import { ClassesService } from '@data/services/classes.service';
import { Inject, Service } from 'typedi';

@Service()
export class GetCustomerDashboardUseCase {
  @Inject()
  // private classService: ClassesService;
  public async call() {
    // const classes = await this.classService.getAllClasses();

    // TODO: Replace hardcoded data with dynamic `classes` data once available.
    /* 
const response = [
  {
    title: 'Trending On Pace',
    type: CARD_TYPES.CLASSES,
    data: classes.map(i => ({
      background_image: i.image || '',
      title: i.title || '',
      start_time: i.from_duration || 0,
      end_time: i.to_duration || 0,
      location: i.location || '',
      categories: [i.type || 'Cardio'],
    })),
  },
  {
    title: 'Top Cardio Classes',
    type: CARD_TYPES.CLASSES,
    data: classes.map(i => ({
      background_image: i.image || '',
      title: i.title || '',
      start_time: i.from_duration || 0,
      end_time: i.to_duration || 0,
      location: i.location || '',
      categories: [i.type || 'Cardio'],
    })),
  },
  {
    title: 'Sign up to any class with “YogaWave” and receive a $20 gift card to Lululemon',
    type: CARD_TYPES.PROMOTION,
    data: [{}],
  },
];
*/

    const response = [
      {
        title: 'Trending On Pace',
        type: CARD_TYPES.CLASSES,
        data: [
          {
            background_image: 'path/to/image1.jpg',
            title: 'Morning Yoga',
            start_time: new Date(),
            end_time: new Date(),
            location: 'Downtown Studio',
            categories: ['Yoga'],
          },
          {
            background_image: 'path/to/image2.jpg',
            title: 'HIIT Cardio Blast',
            start_time: new Date(),
            end_time: new Date(),
            location: 'City Gym',
            categories: ['Cardio'],
          },
        ],
      },
      {
        title: 'Top Cardio Classes',
        type: CARD_TYPES.CLASSES,
        data: [
          {
            background_image: 'path/to/image3.jpg',
            title: 'Spin Class',
            start_time: new Date(),
            end_time: new Date(),
            location: 'Fitness Center',
            categories: ['Cardio'],
          },
          {
            background_image: 'path/to/image4.jpg',
            title: 'Boxing Fitness',
            start_time: new Date(),
            end_time: new Date(),
            location: 'East Side Gym',
            categories: ['Cardio'],
          },
        ],
      },
      {
        title: 'Sign up to any class with “YogaWave” and receive a $20 gift card to Lululemon',
        type: CARD_TYPES.PROMOTION,
        data: [{}],
      },
    ];

    return new HttpResponse(response, false);
  }
}
