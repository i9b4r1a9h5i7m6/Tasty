var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
  approved_at: {
    type: Number
  },
  aspect_ratio: {
    type: String
  },
  beauty_url: {
    type: String
  },
  brand_id: {
    type: Number
  },
  buzz_id: {
    type: Number
  },
  cook_time_minutes: {
    type: Number
  },
  country: {
    type: String
  },
  created_at: {
    type: Number
  },
  description: {
    type: String
  },
  draft_status: {
    type: String
  },
  id: {
    type: Number,
    required: true,
		unique: true
  },
  inspired_by_url: {
    type: String
  },
  is_one_top: {
    type: Boolean
  },
  is_shoppable: {
    type: Boolean
  },
  keywords: {
    type: String
  },
  language: {
    type: String
  },
  name: {
    type: String
  },
  num_servings: {
    type: Number
  },
  prep_time_minutes: {
    type: Number
  },
  promotion: {
    type: String
  },
  seo_title: {
    type: String
  },
  servings_noun_plural: {
    type: String
  },
  servings_noun_singular: {
    type: String
  },
  show_id: {
    type: Number
  },
  slug: {
    type: String
  },
  thumbnail_url: {
    type: String
  },
  tips_and_ratings_enabled: {
    type: Boolean
  },
  total_time_minutes: {
    type: Number
  },
  updated_at: {
    type: Number
  },
  video_id: {
    type: Number
  },
  video_url: {
    type: String
  },
  yields: {
    type: String
  },
  nutrition_visibility: {
    type: String
  },
  compilations: {
    type: Array,
    items: {}
  },
  brand: {
    type: Object,
    properties: {
      id: {
        type: Number
      },
      name: {
        type: String
      },
      slug: {
        type: String
      },
      image_url: {
        type: String
      }
    }
  },
  total_time_tier: {
    type: Object,
    properties: {
      tier: {
        type: String
      },
      display_tier: {
        type: String
      }
    }
  },
  instructions: {
    type: Array,
    items: [
      {
        type: Object,
        properties: {
          id: {
            type: Number
          },
          display_text: {
            type: String
          },
          position: {
            type: Number
          },
          start_time: {
            type: Number
          },
          end_time: {
            type: Number
          },
          temperature: {
            type: Number
          },
          appliance: {
            type: String
          }
        },

      },

    ]
  },
  sections: {
    type: Array,
    items: [
      {
        type: Object,
        properties: {
          components: {
            type: Array,
            items: [
              {
                type: Object,
                properties: {
                  id: {
                    type: Number
                  },
                  raw_text: {
                    type: String
                  },
                  extra_comment: {
                    type: String
                  },
                  position: {
                    type: Number
                  },
                  measurements: {
                    type: Array,
                    items: [
                      {
                        type: Object,
                        properties: {
                          id: {
                            type: Number
                          },
                          quantity: {
                            type: String
                          },
                          unit: {
                            type: Object,
                            properties: {
                              name: {
                                type: String
                              },
                              abbreviation: {
                                type: String
                              },
                              display_singular: {
                                type: String
                              },
                              display_plural: {
                                type: String
                              },
                              system: {
                                type: String
                              }
                            },
                          }
                        },
                      }
                    ]
                  },
                  ingredient: {
                    type: Object,
                    properties: {
                      id: {
                        type: Number
                      },
                      name: {
                        type: String
                      },
                      display_singular: {
                        type: String
                      },
                      display_plural: {
                        type: String
                      },
                      created_at: {
                        type: Number
                      },
                      updated_at: {
                        type: Number
                      }
                    },

                  }
                },

              },

            ]
          },
          name: {
            type: String
          },
          position: {
            type: Number
          }
        },

      },

    ]
  },
  tags: {
    type: Array,
    items: [
      {
        type: Object,
        properties: {
          id: {
            type: Number
          },
          name: {
            type: String
          },
          display_name: {
            type: String
          },
          type: {
            type: String
          }
        },


      }
    ]
  },
  user_ratings: {
    type: Object,
    properties: {
      count_positive: {
        type: Number
      },
      count_negative: {
        type: Number
      },
      score: {
        type: Number
      }
    },

  },
  credits: {
    type: Array,
    items: [
      {
        type: Object,
        properties: {
          id: {
            type: Number
          },
          name: {
            type: String
          },
          slug: {
            type: String
          },
          image_url: {
            type: String
          },
          type: {
            type: String
          }
        },

      }
    ]
  },
  original_video_url: {
    type: String
  },
  video_ad_content: {
    type: String
  },
  canonical_id: {
    type: String
  },
  show: {
    type: Object,
    properties: {
      id: {
        type: Number
      },
      name: {
        type: String
      }
    },

  },
  facebook_posts: {
    type: Array,
    items: {}
  },
  renditions: {
    type: Array,
    items: [
      {
        type: Object,
        properties: {
          height: {
            type: Number
          },
          width: {
            type: Number
          },
          duration: {
            type: Number
          },
          file_size: {
            type: Number
          },
          bit_rate: {
            type: Number
          },
          maximum_bit_rate: {
            type: Number
          },
          minimum_bit_rate: {
            type: Number
          },
          content_type: {
            type: String
          },
          aspect: {
            type: String
          },
          container: {
            type: String
          },
          url: {
            type: String
          },
          poster_url: {
            type: String
          },
          name: {
            type: String
          }
        },
      },
    ]
  },
  nutrition: {
    type: Object,
    properties: {
      calories: {
        type: Number
      },
      carbohydrates: {
        type: Number
      },
      fat: {
        type: Number
      },
      protein: {
        type: Number
      },
      sugar: {
        type: Number
      },
      fiber: {
        type: Number
      },
      updated_at: {
        type: String
      }
    },

  }


}, { timestamps: true });





var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;


