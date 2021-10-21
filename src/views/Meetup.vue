<template>
  <main id="app">
    <section class="lists">
      <section class="left-section">
        <h2>Meet up with friends and family!</h2>
        <ul>
          <li v-for="(activity, i) in activities" :key="i" class="activity-list">
            <div>
              <p>{{ activity.title }}</p>
              <p>{{ activity.date }}</p>
              <p>{{ activity.location }}</p>
            </div>
            <button type="button" @click="rsvpActivity(activity)">RSVP</button>
          </li>
        </ul>
      </section>

      <section class="right-section">
        <h2>Past Meetups</h2>
        <ul>
          <li
            id="activity-test"
            v-for="(activity, i) in rsvpedActivities"
            :key="i"
            class="activity-list"
          >
            <div>
              <p>{{ activity.title }}</p>
              <p>Review: {{ activity.review }}</p>
            </div>
            <button type="button" @click="reviewActivity(activity, i)">Review</button>
          </li>
        </ul>
      </section>
    </section>

    <div class="popup-wrapper" v-if="activity !== null">
      <div class="popup">
        <div class="popup-header">Write a Review</div>
        <div class="popup-body">
          <label for="review">Review</label>
          <input type="text" id="review" class="popup-input" v-model="activity.review" />
          <button type="button" class="popup-button" @click="addReview">Publish Review</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Meetup",
  created() {
    this.addItemsToLocalStorage();
    this.getActivities();
  },
  data() {
    return {
      activities: [],
      rsvpedActivities: [],
      activity: null,
      activityIndex: null
    };
  },
  methods: {
    rsvpActivity(activity) {
      const jsonRsvpedActivities = localStorage.getItem("rsvped_activities");
      const rsvpedActivities = JSON.parse(jsonRsvpedActivities);
      rsvpedActivities.push(activity);

      const asJsonRsvpedActivities = JSON.stringify(rsvpedActivities);
      localStorage.setItem("rsvped_activities", asJsonRsvpedActivities);
      this.getRsvpedActivities();
    },
    reviewActivity(activity, index) {
      this.activity = activity;
      this.activityIndex = index;
    },
    addReview() {
      this.rsvpedActivities[this.activityIndex] = this.activity;

      const asJsonRsvpedActivities = JSON.stringify(this.rsvpedActivities);
      localStorage.setItem("rsvped_activities", asJsonRsvpedActivities);
      this.getRsvpedActivities();

      this.activity = null;
      this.activityIndex = null;
    },
    getActivities() {
      const jsonActivities = localStorage.getItem("activities");
      this.activities = JSON.parse(jsonActivities);
    },
    getRsvpedActivities() {
      const jsonActivities = localStorage.getItem("rsvped_activities");
      this.rsvpedActivities = JSON.parse(jsonActivities);
    },
    addItemsToLocalStorage() {
      const activities = [
        {
          date: "October 30, 2021",
          title: "Halloween Party",
          review: "",
          location: "Blåsippegatan"
        },
        {
          date: "November 28, 2021",
          title: "Thankgiving",
          review: "",
          location: "Violgatan"
        },
        {
          date: "December 24, 2021",
          title: "Christmas Presents",
          review: "",
          location: "Grandmaw's House"
        },
        {
          date: "December 31, 2021",
          title: "New Year's Party",
          review: "",
          location: "Tega"
        }
      ];
      const activitiesJson = JSON.stringify(activities);
      localStorage.setItem("activities", activitiesJson);

      const existing = localStorage.getItem("rsvped_activities");
      if (existing) {
        this.getRsvpedActivities();
      } else {
        const rsvpedActivities = [];
        const rsvpedActivitiesJson = JSON.stringify(rsvpedActivities);
        localStorage.setItem("rsvped_activities", rsvpedActivitiesJson);
      }
    }
  }
};
</script>

<style>
.lists {
  display: flex;
  justify-content: space-around;
  border: 5px solid rgb(112, 33, 59);
  border-radius: 3px;
}

.right-list {
  width: 50%;
}

.activity-list {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  list-style: none;
  border-bottom: 1px #ccc solid;
  padding-bottom: 8px;
}

.popup-wrapper {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: white;
  padding: 1.5em;
  border-radius: 5px;
  width: 75%;
}

.popup-header {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.popup-body {
  display: flex;
  flex-direction: column;
}

.popup-input {
  padding: 0.5rem;
}

h2 {
  font-family: cursive;
  color: rgb(112, 33, 59);
}

p {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: rgb(82, 80, 80);
  margin: 0 1.5rem 1rem 1.5rem;
}

button {
  background-color: rgb(112, 33, 59);
  border: none;
  border-radius: 3px;
  color: white;
  padding: 15px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 1rem 0 0 0;
}
</style>
